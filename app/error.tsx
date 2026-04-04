"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Heart } from "lucide-react";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <main className="text-foreground flex items-center justify-center px-6 py-16">
            <div className="mx-6 w-full rounded-[2rem] border border-border bg-card/90 shadow-2xl backdrop-blur-xl p-10 text-center">
                <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/30 to-primary/20 text-primary">
                    <AlertCircle size={32} />
                </div>

                <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground mb-4">
                    Unexpected error
                </p>

                <h1
                    className="text-3xl font-semibold text-foreground mb-4"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Something went wrong.
                </h1>

                <p
                    className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed mb-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Something went wrong. You can try again or head back home,
                    and we'll do our best to get you back on track. If this
                    keeps happening, please contact us as soon as possible with
                    the following details:
                </p>

                <div className="flex flex-col gap-2">
                    <code className="bg-background mb-3 rounded-sm p-2 text-left text-red-500 border border-border">
                        {error.stack}
                    </code>
                    <button
                        type="button"
                        onClick={reset}
                        className="rounded-2xl border border-border bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                        Try again
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition hover:bg-[#0b132b]"
                    >
                        <ArrowLeft size={16} />
                        Back to home
                    </Link>

                    <div className="mt-8 inline-flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Heart size={16} />
                        If this keeps happening, please refresh or try again
                        later.
                    </div>
                </div>
            </div>
        </main>
    );
}
