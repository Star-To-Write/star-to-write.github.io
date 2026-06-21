// app/submissions/page.tsx
import SubmissionsClient from "@/components/SubmissionsClient";
import { sql } from "@/lib/db";
import type { Submission, Category } from "@/lib/types";
import { client } from "@/sanity/lib/client";

export default async function SubmissionsPage() {
    // Fetch categories
    const categoriesQuery = `
    *[_type == "category"]{
      title,
      "slug": slug.current
    }`;
    const categories: Category[] = await client.fetch(
        categoriesQuery,
        {},
        {
            next: {
                tags: ["category"],
            },
        },
    );

    // Fetch submissions
    const submissionsQuery = `
    *[_type == "submission"]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      submittedDate,
      images[]{
        asset->{
          url
        },
        alt
      },
      author->{
        name,
        anonymous
      },
      category->{
        title,
        "slug": slug.current
      },
      tags[]->{
        name
      }
    }`;
    const submissions: Submission[] = await client.fetch(
        submissionsQuery,
        {},
        {
            next: {
                tags: ["submission", "category", "author", "tag"],
            },
        },
    );

    const ids = submissions.map((s) => s._id);
    const statsRows =
        ids.length > 0
            ? await sql`
    SELECT post_id, likes, views, shares
    FROM post_stats
    WHERE post_id = ANY(${ids})
  `
            : [];

    // Fetch comment counts
    const commentCountsQuery = `
    *[_type == "comment" && submission._ref in $ids]{
      "submissionId": submission._ref
    }`;
    const commentRows =
        ids.length > 0
            ? await client.fetch(
                  commentCountsQuery,
                  { ids },
                  {
                      next: {
                          tags: ["comment", "submission"],
                      },
                  },
              )
            : [];
    const commentMap = new Map<string, number>();
    for (const c of commentRows) {
        commentMap.set(
            c.submissionId,
            (commentMap.get(c.submissionId) || 0) + 1,
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statsMap = new Map(statsRows.map((row: any) => [row.post_id, row]));
    const enrichedSubmissions = submissions.map((s) => ({
        ...s,
        stats: {
            likes: statsMap.get(s._id)?.likes ?? 0,
            views: statsMap.get(s._id)?.views ?? 0,
            shares: statsMap.get(s._id)?.shares ?? 0,
            comments: commentMap.get(s._id) ?? 0,
        },
    }));

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1
                    className="text-4xl mb-4 text-primary"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Submissions
                </h1>
                <p
                    className="text-muted-foreground max-w-2xl"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Discover amazing works from talented young writers across
                    all categories and genres.
                </p>
            </div>

            {/* Client-side component handles search, filter, sort */}
            <SubmissionsClient
                submissions={enrichedSubmissions}
                categories={categories}
            />
        </div>
    );
}
