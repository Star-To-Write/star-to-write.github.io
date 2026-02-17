import { client } from "@/sanity/lib/client";
import { Button } from "./ui/Button";
import { LatestSubmissions } from "@/lib/types";
import Image from "next/image";

export async function RecentPosts() {
    const newPublishedPiecesQuery = `
*[_type == "submission" && status == "Published"]{
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
  tags[]->{
    name
  },
  category->{
    title,
    "slug": slug.current
  }
} | order(submittedDate desc)[0..3]

`;
    const newPublishedPiecesRes = await client.fetch<LatestSubmissions[]>(
        newPublishedPiecesQuery,
        {},
        {},
    );
    // console.log(newPublishedPiecesRes);

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <div className="mb-12">
                <h2
                    className="text-3xl mb-4 text-primary"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    NEWEST PUBLISHED PIECES
                </h2>
                <p
                    className="text-muted-foreground max-w-2xl"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Discover our latest publications from talented young
                    writers, artists, and journalists.
                </p>
            </div>

            <div className="space-y-8">
                {newPublishedPiecesRes.map((submission) => (
                    <div
                        key={submission.slug}
                        className="group grid md:grid-cols-3 gap-8 bg-card/30 backdrop-blur-sm border border-border rounded-xl p-8 hover:border-[#d4af37]/50 transition-all duration-300"
                    >
                        <div className="md:col-span-2">
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

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-[#d4af37]/10 to-transparent">
                                <Image
                                    src={submission.images[0].asset.url}
                                    alt={submission.title}
                                    fill
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {/* {archiveItems.map((item) => (
        ))} */}
            </div>
        </div>
    );
}
