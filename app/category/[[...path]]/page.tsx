import SubmissionComments from "@/components/submission/SubmissionComments";
import SubmissionCarousel from "@/components/SubmissionCarousel";
import TrackView from "@/components/TrackView";
import JournalismClient from "@/components/JournalismClient";
import { RichTextRenderer } from "@/components/ui/RichText";
import { Comment, Submission } from "@/lib/types";
import { buildNestedComments } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import LeaveAComment from "@/components/LeaveAComment";
import SubmissionLike from "@/components/submission/SubmissionLike";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sql } from "@/lib/db";

export const revalidate = 60; // ⏱ cache for 1 min

type Category = {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    parent?: {
        _ref: string;
    };
};

export default async function Page({
    params,
}: {
    params: Promise<{ path?: string[] }>;
}) {
    const { path = [] } = await params;

    if (path.length === 0) {
        notFound();
    }

    // Try to find the deepest category by traversing the path
    let currentCategory: Category | null = null;
    const categoryPath: Category[] = [];

    for (let i = 0; i < path.length; i++) {
        const segment = path[i];
        const parentId: string | null = currentCategory
            ? currentCategory._id
            : null;

        const categoryQuery: string = parentId
            ? `*[_type == "category" && slug.current == $slug && parent._ref == $parentId][0]{_id, title, "slug": slug.current, description, parent}`
            : `*[_type == "category" && slug.current == $slug && !defined(parent)][0]{_id, title, "slug": slug.current, description, parent}`;

        const category: Category | null = await client.fetch(categoryQuery, {
            slug: segment,
            parentId,
        });

        if (!category) {
            // This segment is not a category, so it might be a submission
            if (i === path.length - 1 && currentCategory) {
                // Last segment and we have a category - check if it's a submission
                const fullCategoryPath = categoryPath
                    .map((cat) => cat.slug)
                    .join("/");
                return await renderSubmission(
                    currentCategory,
                    segment,
                    fullCategoryPath,
                );
            }
            notFound();
        }

        currentCategory = category;
        categoryPath.push(category);
    }

    // If we get here, all segments are categories - show the deepest category
    return await renderCategory(currentCategory!, categoryPath);
}

async function renderCategory(category: Category, categoryPath: Category[]) {
    // Build the full category path for queries
    const categoryTitle = category.title;

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

    // Build breadcrumb path
    const breadcrumbPath = categoryPath.map((cat) => cat.slug).join("/");

    // 🔹 Merge stats into articles
    const enrichedArticles = articles.map((article) => {
        const stats = statsMap.get(article._id);

        return {
            ...article,
            slug: `${breadcrumbPath}/${article.slug}`, // Full path for links
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
            breadcrumbPath={breadcrumbPath}
        />
    );
}

async function renderSubmission(
    category: Category,
    submissionSlug: string,
    categoryPath: string,
) {
    const query = `
  *[_type == "submission" && slug.current == $slug && category._ref == $categoryId]{
    _id,
    author->{ name, bio, socials, anonymous },
    title,
    content,
    category->{ title, "slug": slug.current },
    tags->{ name },
    featured,
    submittedDate,
    images[]{
      asset->{ url }
    }
  }[0]
  `;

    const submission = await client.fetch<Submission>(
        query,
        {
            slug: submissionSlug,
            categoryId: category._id,
        },
        { perspective: "published" },
    );

    if (!submission) {
        return <div>Submission not found</div>;
    }

    const commentQuery = `
    *[_type == "comment" && submission._ref == $submissionId]{
    _id,
    submission,
    name,
    email,
    parent,
    content,
    createdAt
    }`;

    const submissionComments = await client.fetch<Comment[]>(commentQuery, {
        submissionId: submission._id,
    });

    return (
        <div className="text-foreground">
            <TrackView subId={submission._id} />
            <article className="px-12 lg:px-48">
                {/* Details */}
                <div className="flex gap-2 text-gray-500">
                    <Link
                        href={`/category/${categoryPath}`}
                        className="tracking-wide text-primary"
                    >
                        {category.title.toUpperCase()}
                    </Link>
                    <p>
                        {new Date(
                            submission.submittedDate,
                        ).toLocaleDateString()}
                    </p>
                    <p>{submissionComments.length} COMMENTS</p>
                    <SubmissionLike submissionId={submission._id} />
                </div>
                <h1 className="text-3xl text-foreground mt-1">
                    {submission.title}
                </h1>
                <p className="text-md text-foreground font-georgia italic">
                    by{" "}
                    {submission.author.anonymous
                        ? "An Anonymous Writer"
                        : submission.author.name}
                </p>
                <hr className="h-px w-full bg-foreground opacity-40 border-0 my-2" />
            </article>
            <SubmissionCarousel images={submission.images} />
            <article className="font-georgia px-12">
                <div className="text-foreground">
                    <RichTextRenderer value={submission.content} />
                </div>
            </article>
            <div className="px-12">
                <hr className="h-px w-full bg-foreground opacity-40 border-0 my-2 pr-12" />
                <p className="text-xl text-primary font-bold">
                    ABOUT THE AUTHOR
                </p>
                <p className="text-md">
                    {submission.author.bio ?? "No bio provided."}
                </p>
                <br />
                {submission.author.socials &&
                    submission.author.socials.map((social) => (
                        <p key={social._key}>
                            {social.platform.charAt(0).toUpperCase() +
                                social.platform.slice(1)}
                            : {social.username}
                        </p>
                    ))}
                <hr className="h-px w-full bg-foreground opacity-40 border-0 my-2 pr-12" />
                <p className="text-xl font-inter text-primary font-bold">
                    COMMENTS
                </p>
                <LeaveAComment submissionId={submission._id} />
                <SubmissionComments
                    submissionId={submission._id}
                    comments={buildNestedComments(submissionComments)}
                />
            </div>
        </div>
    );
}
