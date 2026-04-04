import Link from "next/link";
import { ArrowLeft, CircleQuestionMark, Heart } from "lucide-react";

export default function NotFound() {
    return (
        <main className="text-foreground flex items-center justify-center px-6 py-16">
            <div className="max-w-3xl w-full rounded-[2rem] border border-border bg-card/90 shadow-2xl backdrop-blur-xl p-10 text-center">
                <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/30 to-primary/20 text-primary">
                    <CircleQuestionMark size={32} />
                </div>

                <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground mb-4">
                    404 · Page not found
                </p>

                <h1
                    className="text-3xl md:text-3xl font-semibold text-foreground mb-4"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Oops! That page is missing.
                </h1>

                <p
                    className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed mb-8"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Looks like the page you're trying to reach doesn't exist
                    anymore, or the link is broken. Let's get you back to
                    somewhere nice.
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                    <Link
                        href="/"
                        className="rounded-2xl border border-border bg-[#0f172a]/80 px-5 py-4 text-left transition hover:border-primary/60 hover:bg-[#0b132b]"
                    >
                        <p className="text-sm text-primary mb-2">Home</p>
                        <p className="text-sm text-muted-foreground">
                            Return to the main page.
                        </p>
                    </Link>

                    <Link
                        href="/foundation"
                        className="rounded-2xl border border-border bg-[#0f172a]/80 px-5 py-4 text-left transition hover:border-primary/60 hover:bg-[#0b132b]"
                    >
                        <p className="text-sm text-primary mb-2">Foundation</p>
                        <p className="text-sm text-muted-foreground">
                            Browse organizations and resources.
                        </p>
                    </Link>

                    <Link
                        href="/gallery"
                        className="rounded-2xl border border-border bg-[#0f172a]/80 px-5 py-4 text-left transition hover:border-primary/60 hover:bg-[#0b132b]"
                    >
                        <p className="text-sm text-primary mb-2">Gallery</p>
                        <p className="text-sm text-muted-foreground">
                            Explore art and design work.
                        </p>
                    </Link>
                </div>

                <Link
                    href="/"
                    className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                    <ArrowLeft size={16} />
                    Back to home
                </Link>

                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Heart size={16} />
                    Need help? Check your URL or reach out if this keeps
                    happening.
                </div>
            </div>
        </main>
    );
}
