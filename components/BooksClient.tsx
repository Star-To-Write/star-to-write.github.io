"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    ExternalLink,
    Sparkles,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Book } from "@/lib/types";

const normalizeBookTypes = (value?: string | string[]) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
};

export default function BooksClient({ books }: { books: Book[] }) {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [selectedDetailId, setSelectedDetailId] = useState<string | null>(
        null,
    );

    const featuredBook = books[featuredIndex] ?? books[0];
    const previousBook =
        books[(featuredIndex - 1 + books.length) % books.length];
    const nextBook = books[(featuredIndex + 1) % books.length];

    const detailBook = useMemo(
        () => books.find((book) => book._id === selectedDetailId) ?? null,
        [books, selectedDetailId],
    );

    useEffect(() => {
        if (!selectedDetailId) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedDetailId(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedDetailId]);

    const cycleFeatured = (direction: -1 | 1) => {
        if (books.length === 0) return;
        setFeaturedIndex((current) => {
            const next = (current + direction + books.length) % books.length;
            return next;
        });
    };

    if (books.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-border bg-card/30 p-10 text-center text-muted-foreground">
                <Sparkles className="mx-auto mb-3 text-primary" size={28} />
                <p style={{ fontFamily: "Inter, sans-serif" }}>
                    No books are available yet! Sit tight and wait for our
                    talented staff to publish these amazing books!
                </p>
            </div>
        );
    }

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center text=center gap-4">
                <h1
                    className="text-4xl text-primary whitespace-nowrap"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Book Collection
                </h1>
                <div className="w-24 h-1 bg-primary mx-auto"></div>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-center">
                    Discover a new world through the words of young poets and
                    authors.
                </p>
            </div>

            <section className="rounded-2xl bg-card/40 backdrop-blur-sm p-5 lg:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-primary">
                        <span
                            className="text-2xl"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Latest Books
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => cycleFeatured(-1)}
                            className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-primary hover:text-primary"
                            aria-label="Show previous book"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => cycleFeatured(1)}
                            className="rounded-full border border-border p-2 text-muted-foreground transition hover:border-primary hover:text-primary"
                            aria-label="Show next book"
                        >
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-[320px] rounded-2xl bg-background/40 p-4">
                        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 md:block">
                            <button
                                type="button"
                                onClick={() => cycleFeatured(-1)}
                                className="overflow-hidden rounded-xl border border-border bg-card/80 p-2 text-muted-foreground shadow-sm transition hover:border-primary hover:text-primary"
                            >
                                <div className="relative aspect-[4/5] w-20">
                                    {previousBook.cover?.asset?.url ? (
                                        <Image
                                            src={previousBook.cover.asset.url}
                                            alt={
                                                previousBook.cover.alt ||
                                                previousBook.title
                                            }
                                            fill
                                            className="object-contain"
                                            sizes="80px"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                                            <BookOpen size={24} />
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 md:block">
                            <button
                                type="button"
                                onClick={() => cycleFeatured(1)}
                                className="overflow-hidden rounded-xl border border-border bg-card/80 p-2 text-muted-foreground shadow-sm transition hover:border-primary hover:text-primary"
                            >
                                <div className="relative aspect-[4/5] w-20">
                                    {nextBook.cover?.asset?.url ? (
                                        <Image
                                            src={nextBook.cover.asset.url}
                                            alt={
                                                nextBook.cover.alt ||
                                                nextBook.title
                                            }
                                            fill
                                            className="object-contain"
                                            // sizes="80px"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                                            <BookOpen size={24} />
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className="mx-auto flex h-full max-w-[320px] items-center justify-center">
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
                                {featuredBook.cover?.asset?.url ? (
                                    <Image
                                        src={featuredBook.cover.asset.url}
                                        alt={
                                            featuredBook.cover.alt ||
                                            featuredBook.title
                                        }
                                        fill
                                        className="object-contain"
                                        sizes="320px"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                                        <BookOpen size={48} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3 rounded-2xl bg-background/40 p-4">
                        <div className="flex flex-wrap gap-2">
                            {normalizeBookTypes(featuredBook.type).map(
                                (bookType) => (
                                    <span
                                        key={bookType}
                                        className="rounded-full bg-primary/15 py-1 text-sm font-medium text-primary"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {bookType}
                                    </span>
                                ),
                            )}
                        </div>

                        <h2
                            className="text-3xl text-primary"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            {featuredBook.title}
                        </h2>

                        <p
                            className="text-sm text-muted-foreground"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            By{" "}
                            {featuredBook.author?.anonymous
                                ? "An Anonymous Writer"
                                : featuredBook.author?.name || "Unknown Author"}
                        </p>

                        <p
                            className="line-clamp-4 text-sm leading-6 text-foreground"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {featuredBook.synopsis ||
                                "A thoughtfully published book from the Star to Write community."}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <span className="text-xl font-semibold text-primary">
                                ${featuredBook.price.toFixed(2)}
                            </span>
                            <Button
                                asChild
                                className="bg-primary text-primary-foreground hover:opacity-90"
                            >
                                <Link
                                    href={featuredBook.link}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <ExternalLink size={16} className="mr-2" />
                                    Read / Buy
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                    <h2
                        className="text-2xl"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Other Books
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {books.map((book) => (
                        <article
                            key={book._id}
                            className="overflow-hidden rounded-2xl border border-border bg-card/40"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                {book.cover?.asset?.url ? (
                                    <Image
                                        src={book.cover.asset.url}
                                        alt={book.cover.alt || book.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 1280px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                                        <BookOpen size={36} />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 p-4">
                                <h3
                                    className="text-lg text-primary"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    {book.title}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedDetailId(book._id)
                                    }
                                    className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {detailBook && (
                <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 mt-0">
                    <div className="max-w-3xl w-full max-h-[90vh] bg-background border border-border rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#d4af37]/20 bg-background">
                                    {detailBook.cover?.asset?.url ? (
                                        <Image
                                            src={detailBook.cover.asset.url}
                                            alt={
                                                detailBook.cover.alt ||
                                                detailBook.title
                                            }
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            <BookOpen size={28} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h2
                                        className="text-2xl text-primary"
                                        style={{
                                            fontFamily: "Georgia, serif",
                                        }}
                                    >
                                        {detailBook.title}
                                    </h2>
                                    <div className="flex gap-2 flex-wrap mt-2">
                                        {normalizeBookTypes(
                                            detailBook.type,
                                        ).map((bookType) => (
                                            <span
                                                key={bookType}
                                                className="rounded-full bg-primary/15 py-1 text-[11px] font-medium text-primary"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                {bookType}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedDetailId(null)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
                            <div className="space-y-6">
                                <div>
                                    <h3
                                        className="text-lg font-semibold text-primary mb-2"
                                        style={{
                                            fontFamily: "Georgia, serif",
                                        }}
                                    >
                                        Synopsis
                                    </h3>
                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {detailBook.synopsis ||
                                            "A thoughtfully published book from the Star to Write community."}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3
                                            className="text-sm font-semibold text-primary mb-1"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            Author
                                        </h3>
                                        <p
                                            className="text-muted-foreground"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {detailBook.author?.anonymous
                                                ? "An Anonymous Writer"
                                                : detailBook.author?.name ||
                                                  "Unknown Author"}
                                        </p>
                                    </div>
                                    <div>
                                        <h3
                                            className="text-sm font-semibold text-primary mb-1"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            Price
                                        </h3>
                                        <p
                                            className="text-muted-foreground"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            ${detailBook.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-border">
                                    <Button
                                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                        asChild
                                    >
                                        <Link
                                            href={detailBook.link}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            <ExternalLink
                                                size={16}
                                                className="mr-2"
                                            />
                                            Read / Buy
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
