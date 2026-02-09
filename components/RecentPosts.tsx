import { client } from "@/sanity/lib/client";
import { Button } from "./ui/Button";
import { LatestSubmissions } from "@/lib/types";

const archiveItems = [
    {
        id: 1,
        title: "The Stranger",
        author: "Alex Rodriguez",
        category: "Short Fiction",
        excerpt:
            "A stranger gave you this mask and told you to take care of it. It is grotesque and looks ancient, but you notice...",
        image: "https://images.unsplash.com/photo-1567988122319-039d80fafc34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1NTYyNTgzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        date: "December 2024",
    },
    {
        id: 2,
        title: "Digital Echoes",
        author: "Jordan Kim",
        category: "Poetry",
        excerpt:
            "In the silence between keystrokes, I find fragments of myself scattered across digital landscapes...",
        image: "https://images.unsplash.com/photo-1500381457785-20c97a29c78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwb2V0cnklMjBib29rfGVufDF8fHx8MTc1NTcyODAyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        date: "November 2024",
    },
    {
        id: 3,
        title: "The Last Letter",
        author: "Sam Chen",
        category: "Creative Nonfiction",
        excerpt:
            "I found my grandmother's letters hidden in her typewriter case, each word a bridge across decades...",
        image: "https://images.unsplash.com/photo-1727302788687-0c1fc737bd4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBlNXJpdGVyJTIwd3JpdGluZyUyMHBhcGVyfGVufDF8fHx8MTc1NTcyODAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        date: "October 2024",
    },
];

export async function RecentPosts() {
    const newPublishedPiecesQuery = `
*[_type == "submission" && status == "Published"]{
  title,
  "slug": slug.current,
  excerpt,
  submittedDate,
  coverImage{
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
                                <img
                                    src={submission.coverImage?.asset.url}
                                    alt={submission.title}
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
