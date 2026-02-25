// import { Button } from "@/components/ui/Button";
import SubmissionCarousel from "./components/SubmissionCarousel";
import { RichTextRenderer } from "@/components/ui/RichText";
import { Submission } from "@/lib/types";
import { client } from "@/sanity/lib/client";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const query = `
*[_type == "submission" && status == "Published" && slug.current == $slug]{
    author->{
        name,
        anonymous
    },
    title,
    content,
    category->{
        title,
        "slug": slug.current
    },
    tags->{
        name
    },
    featured,
    submittedDate,
    images[]{
      asset->{
        url
      }
    }
}[0]`;
    const submission = await client.fetch<Submission>(query, {
        slug: slug,
    });

    // Add/remove fallback image URLs here for testing or if Sanity has no images.
    const fallbackImages = [
        { asset: { url: "/images/sample-1.jpg" } },
        { asset: { url: "/images/sample-2.jpg" } },
    ];
    const carouselImages =
        submission?.images && submission.images.length > 0
            ? submission.images
            : fallbackImages;

    console.log(submission);
    return (
        <div>
<article className="prose mx-auto">
    <h1>{submission.title}</h1>

    <div className="mx-5 text-foreground">
        <RichTextRenderer value={submission.content} />
    </div>

    <SubmissionCarousel images={carouselImages} />
</article>
            {}
        </div>
    );
}
