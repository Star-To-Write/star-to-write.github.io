import SubmissionComments from "@/components/submission/SubmissionComments";
import SubmissionCarousel from "@/components/SubmissionCarousel";
import TrackView from "@/components/TrackView";
import { RichTextRenderer } from "@/components/ui/RichText";
import { Comment, Submission } from "@/lib/types";
import { buildNestedComments } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import LeaveAComment from "@/components/LeaveAComment";
import SubmissionLike from "@/components/submission/SubmissionLike";
import Link from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const query = `
  *[_type == "submission" && slug.current == $slug]{
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
            slug: slug,
        },
        { perspective: "published" },
    );
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
    console.log(submission.author);
    // BUG: add like some utility class adding the line.
    return (
        <div className="text-foreground">
            <TrackView subId={submission._id} />
            <article className="px-12 lg:px-48">
                {/* Details */}
                <div className="flex gap-2 text-gray-500">
                    <Link
                        href={`/${submission.category.slug}`}
                        className="tracking-wide text-primary"
                    >
                        {submission.category.title.toUpperCase()}
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
                    {/* add some link that allows you to see this person's posts if posible */}
                    {submission.author.anonymous
                        ? "An Anonymous Writer"
                        : submission.author.name}
                </p>
                {/* add some small line here */}
                <hr className="h-px w-full bg-foreground opacity-40 border-0 my-2" />
            </article>
            {/* BUG: IF images. */}
            <SubmissionCarousel images={submission.images} />
            <article className="font-georgia px-12">
                <div className="text-foreground">
                    <RichTextRenderer value={submission.content} />
                </div>
            </article>
            {/* author + comments part */}
            {/* NOTE: only show if not anonymous */}
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
