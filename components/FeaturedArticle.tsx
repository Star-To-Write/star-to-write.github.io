import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { type FeaturedSubmission } from "@/lib/types";

export async function FeaturedArticle() {
  const featuredArticleQuery = `*[_type == "submission" && status == "Published" && featured]{
    title,
    "slug": slug.current,
    excerpt,
    images[]{ asset->{ url }, alt },
    author->{ name, anonymous },
    tags[]->{ name },
    category->{ "slug": slug.current, title }
  } | order(submittedDate asc)[0]`;

  const featuredSubmission = await client.fetch<FeaturedSubmission>(featuredArticleQuery);

  // SAFETY: if nothing is returned, render fallback
  if (!featuredSubmission) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 text-center text-muted-foreground">
        No featured submission available
      </div>
    );
  }

  const imageUrl = featuredSubmission.images?.[0]?.asset?.url || "";
  const imageAlt = featuredSubmission.images?.[0]?.alt || "Featured image";

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-12">
        <div className="text-xs tracking-widest text-primary uppercase mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
          UNLOCKED:
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div>
            <h1 className="text-4xl lg:text-5xl mb-2 text-primary" style={{ fontFamily: "Georgia, serif" }}>
              {featuredSubmission.title || "Untitled"}
            </h1>
            <p className="text-lg italic text-muted-foreground mb-6" style={{ fontFamily: "Georgia, serif" }}>
              by {featuredSubmission.author?.anonymous ? "an Anonymous Writer" : featuredSubmission.author?.name || "Unknown"}
            </p>
            <div className="mb-8">
              <h3 className="text-lg mb-4 text-foreground" style={{ fontFamily: "Georgia, serif" }}>
                About The Submission:
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                {featuredSubmission.excerpt || "No description available."}
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-[#d4af37]/20 to-transparent">
              {imageUrl && <Image src={imageUrl} alt={imageAlt} fill className="w-full h-full object-cover opacity-80" />}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}