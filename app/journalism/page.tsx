// app/journalism/page.tsx

import JournalismClient from "@/components/JournalismClient";
import { sql } from "@/lib/db";
import { Submission } from "@/lib/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 60; // ⏱ cache for 1 min

export default async function Page() {
    const categoryTitle = "Journalism";

    // 🔹 Fetch category info
    const category = await client.fetch<{
        title: string;
        description?: string;
    }>('*[_type == "category" && title == $title][0]{title, description}', {
        title: categoryTitle,
    });

    // 🔹 Fetch Sanity data in parallel
    const [tags, articles] = await Promise.all([
        client.fetch<string[]>(
            '*[_type == "tag" && category->title == $category].name',
            { category: categoryTitle },
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
            { category: categoryTitle },
            { perspective: "published" },
        ),
    ]);

    // 🔹 Get all article IDs
    const ids = articles.map((a) => a._id);

    // 🔹 Fetch ALL stats in one query (FAST 🚀)
    const statsRows = await sql`
    SELECT sub_id, likes, views, shares
    FROM sub_stats
    WHERE sub_id = ANY(${ids})
  `;

    // 🔹 Create lookup map
    const statsMap = new Map(statsRows.map((row) => [row.sub_id, row]));

    // 🔹 Merge stats into articles
    const enrichedArticles = articles.map((article) => {
        const stats = statsMap.get(article._id);

        console.log(article._id, stats);

        return {
            ...article,
            stats: {
                likes: stats?.likes ?? 0,
                views: stats?.views ?? 0,
                shares: stats?.shares ?? 0,
            },
        };
    });

    // 🔹 Pass enriched data to client
    return (
        <JournalismClient
            tags={tags}
            articles={enrichedArticles}
            categoryTitle={category?.title}
            categoryDescription={category?.description}
        />
    );
}
