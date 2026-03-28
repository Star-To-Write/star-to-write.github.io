import GalleryClient from "@/components/GalleryClient";
import { client } from "@/sanity/lib/client";
import { sql } from "@/lib/db";
import type { GalleryItem } from "@/lib/types";

export const revalidate = 3600;

type GalleryQueryResult = {
    _id: string;
    title: string;
    slug: string;
    author: {
        name?: string;
        anonymous?: boolean;
    };
    description: string;
    category: string;
    featured: boolean;
    images: {
        asset: {
            url: string;
        };
        alt?: string;
    }[];
};

type GalleryStatsRow = {
    sub_id: string;
    likes: number;
    views: number;
};

export default async function GalleryPage() {
    const galleryQuery = `
        *[_type == "gallery"] | order(_createdAt desc) {
            _id,
            title,
            "slug": slug.current,
            author->{
                name,
                anonymous
            },
            description,
            category,
            featured,
            images[]{
                asset->{ url },
                alt
            }
        }
    `;

    const galleryResults: GalleryQueryResult[] =
        await client.fetch(galleryQuery);
    const ids = galleryResults.map((item) => item._id);

    const statsRows =
        ids.length > 0
            ? await sql`SELECT sub_id, likes, views FROM sub_stats
        WHERE sub_id = ANY(${ids})
    `
            : [];

    const statsMap = new Map(
        (statsRows as GalleryStatsRow[]).map((row) => [row.sub_id, row]),
    );

    const comments =
        ids.length > 0
            ? await client.fetch(
                  `*[_type == "comment" && gallery._ref in $ids]{
                        gallery->{ _id },
                  }`,
                  { ids },
              )
            : [];

    const commentCounts = new Map<string, number>();

    (comments as { gallery?: { _id: string } }[]).forEach((comment) => {
        const galleryId = comment.gallery?._id;
        if (!galleryId) return;
        commentCounts.set(galleryId, (commentCounts.get(galleryId) ?? 0) + 1);
    });

    const items: GalleryItem[] = galleryResults.map((item) => ({
        id: item._id,
        slug: item.slug,
        title: item.title,
        author: {
            name: item.author?.name ?? "Unknown",
            anonymous: item.author?.anonymous ?? false,
            bio: "",
            socials: [],
        },
        description: item.description,
        category: item.category,
        featured: item.featured ?? false,
        images:
            item.images?.map((image) => ({
                asset: image.asset,
                alt: image.alt ?? "",
            })) ?? [],
        likes: statsMap.get(item._id)?.likes ?? 0,
        comments: commentCounts.get(item._id) ?? 0,
        views: statsMap.get(item._id)?.views ?? 0,
        isLiked: false,
    }));

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <GalleryClient galleryItems={items} />
        </div>
    );
}
