import { Button } from "@/components/ui/Button";
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
        submittedDate

    }[0]`;
    const submission = await client.fetch<Submission>(query, {
        slug: slug,
    });

    console.log(submission);
    return (
        <div>
            <article className="prose mx-auto">
                <h1>{submission.title}</h1>
                {/* Content renderer */}
                <div className="mx-5 text-foreground">
                    <RichTextRenderer value={submission.content} />
                </div>
            </article>
            {/* <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                    <span
                        className="text-xs tracking-wide text-primary uppercase"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        {submission.category?.title.toUpperCase()}
                    </span>
                    <span
                        className="text-xs text-muted-foreground"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        {new Date(
                            submission.submittedDate,
                        ).toLocaleDateString()}
                    </span>
                </div>

                <h3
                    className="text-2xl mb-3 text-foreground group-hover:text-primary transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    {submission.title}
                </h3>

                <p
                    className="text-sm text-muted-foreground mb-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    By{" "}
                    {submission.author.anonymous
                        ? "an Anonymous Writer"
                        : submission.author.name}
                </p>

                <p
                    className="text-muted-foreground leading-relaxed mb-6"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    {submission.excerpt}
                </p>

                <Button
                    variant="outline"
                    className="border-[#d4af37]/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    READ MORE →
                </Button>
            </div>
            <h1>{}</h1>
            <div
                key={submission.slug}
                className="group grid md:grid-cols-3 gap-8 bg-card/30 backdrop-blur-sm border border-border rounded-xl p-8 hover:border-[#d4af37]/50 transition-all duration-300"
            >
                <div className="relative">
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-[#d4af37]/10 to-transparent">
                        <img
                            src={submission.coverImage?.asset.url}
                            alt={submission.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                </div>
            </div> */}
        </div>
    );
}
