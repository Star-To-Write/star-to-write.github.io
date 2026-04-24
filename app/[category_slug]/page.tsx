import JournalismClient from "@/components/JournalismClient";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";
import { Submission } from "@/lib/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // ⏱ cache for 1 min

export default async function Page({
    params,
}: {
    params: Promise<{ category_slug: string }>;
}) {
    const { category_slug } = await params;

    // 🔹 Fetch category info by slug
    const category = await client.fetch<{
        title: string;
        description?: string;
    }>(
        '*[_type == "category" && slug.current == $slug][0]{title, description}',
        { slug: category_slug },
    );

    if (!category) {
        notFound();
    }

    // 🔹 Fetch Sanity data in parallel
    const [tags, articles] = await Promise.all([
        client.fetch<string[]>(
            '*[_type == "tag" && category->title == $category].name',
            { category: category.title },
        ),
        client.fetch<Submission[]>(
            `*[_type == "submission" && category->title == $category]{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        submittedDate,
        images[]{
          asset->{ url },
          alt
        },
        author->{
          name,
          bio,
          socials,
          anonymous
        },
        tags[]->{
          name
        },
        category->{
          title,
          "slug": slug.current
        }
      } | order(submittedDate desc)[0..10]`,
            { category: category.title },
            { perspective: "published" },
        ),
    ]);

    // 🔹 Get all article IDs
    const ids = articles.map((a) => a._id);

    // 🔹 Fetch ALL stats in one query (FAST 🚀)
    const statsRows =
        ids.length > 0
            ? await sql`
    SELECT sub_id, likes, views, shares
    FROM sub_stats
    WHERE sub_id = ANY(${ids})
  `
            : [];

    // Fetch comment counts
    const commentCountsQuery = `
    *[_type == "comment" && submission._ref in $ids]{
      "submissionId": submission._ref
    }`;
    const commentRows =
        ids.length > 0 ? await client.fetch(commentCountsQuery, { ids }) : [];
    const commentMap = new Map<string, number>();
    for (const c of commentRows) {
        commentMap.set(
            c.submissionId,
            (commentMap.get(c.submissionId) || 0) + 1,
        );
    }

    // 🔹 Create lookup map
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statsMap = new Map(statsRows.map((row: any) => [row.sub_id, row]));

    // 🔹 Merge stats into articles
    const enrichedArticles = articles.map((article) => {
        const stats = statsMap.get(article._id);

        return {
            ...article,
            stats: {
                likes: stats?.likes ?? 0,
                views: stats?.views ?? 0,
                shares: stats?.shares ?? 0,
                comments: commentMap.get(article._id) ?? 0,
            },
        };
    });

    // 🔹 Pass enriched data to client
    return (
        <JournalismClient
            tags={tags}
            articles={enrichedArticles}
            categoryTitle={category.title}
            categoryDescription={category.description}
        />
    );
}
