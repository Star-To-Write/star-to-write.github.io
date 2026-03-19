import SubmissionComments from "@/components/submission/SubmissionComments";
import SubmissionCarousel from "@/components/SubmissionCarousel";
import TrackView from "@/components/TrackView";
import { RichTextRenderer } from "@/components/ui/RichText";
import { Comment, Submission } from "@/lib/types";
import { buildNestedComments } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const query = `
  *[_type == "submission" && status == "Published" && slug.current == $slug]{
    _id,
    author->{ name, anonymous },
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

    const submission = await client.fetch<Submission>(query, {
        slug: slug,
    });

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

    console.log(submissionComments);

    return (
        <div>
            <TrackView subId={submission._id} />
            <article className="prose mx-auto">
                <h1>{submission.title}</h1>

                <SubmissionCarousel images={submission.images} />

                <div className="mx-5 text-foreground">
                    <RichTextRenderer value={submission.content} />
                </div>
            </article>
            <SubmissionComments
                comments={buildNestedComments(submissionComments)}
            />
        </div>
    );
}
