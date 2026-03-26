"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { SubscribeNews } from "@/components/SubscribeNews";
import { DontGo } from "@/components/DontGo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Submission } from "@/lib/types";

type SubmissionWithStats = Submission & {
    stats: {
        likes: number;
        views: number;
        shares: number;
    };
};

type Props = {
    tags: string[];
    articles: SubmissionWithStats[];
    categoryTitle?: string;
    categoryDescription?: string;
    breadcrumbPath?: string;
};

export default function JournalismClient({
    tags,
    articles,
    categoryTitle = "Star to Write Journalistic Media",
    categoryDescription = "In-depth reporting and analysis from young international journalists covering the stories that matter to our generation.",
    breadcrumbPath,
}: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredArticles = articles.filter((article) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            article.title?.toLowerCase().includes(search) ||
            article.author?.name?.toLowerCase().includes(search) ||
            article.excerpt?.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            article.tags?.some((tag) => tag.name === selectedCategory);

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <div className="text-foreground max-w-7xl mx-auto px-6 lg:px-12 py-12">
                {/* Breadcrumbs */}
                {breadcrumbPath && (
                    <div className="mb-6">
                        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>
                            <span>/</span>
                            <Link
                                href="/category"
                                className="hover:text-primary"
                            >
                                Categories
                            </Link>
                            {breadcrumbPath.split("/").map((segment, index) => {
                                const path = breadcrumbPath
                                    .split("/")
                                    .slice(0, index + 1)
                                    .join("/");
                                return (
                                    <span
                                        key={path}
                                        className="flex items-center space-x-2"
                                    >
                                        <span>/</span>
                                        <Link
                                            href={`/category/${path}`}
                                            className="hover:text-primary capitalize"
                                        >
                                            {segment.replace(/-/g, " ")}
                                        </Link>
                                    </span>
                                );
                            })}
                        </nav>
                    </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl mb-4 text-primary">
                        {categoryTitle}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {categoryDescription}
                    </p>
                </div>

                {/* Newsletter */}
                <div className="mb-8">
                    <SubscribeNews />
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                            size={20}
                        />
                        <Input
                            placeholder="Search articles by title, author, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 py-3 text-base"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div className="mb-8 flex flex-wrap justify-center gap-4">
                    <Button
                        onClick={() => setSelectedCategory("All")}
                        variant={
                            selectedCategory === "All" ? "default" : "outline"
                        }
                    >
                        All
                    </Button>

                    {tags.map((tag) => (
                        <Button
                            key={tag}
                            onClick={() => setSelectedCategory(tag)}
                            variant={
                                selectedCategory === tag ? "default" : "outline"
                            }
                        >
                            {tag}
                        </Button>
                    ))}
                </div>

                {/* Results */}
                <div className="mb-6 text-center text-sm text-muted-foreground">
                    {selectedCategory === "All"
                        ? "All Articles"
                        : selectedCategory}{" "}
                    • {filteredArticles.length} articles found
                </div>

                {/* Articles */}
                <div className="grid md:grid-cols-2 gap-8">
                    {filteredArticles.map((article) => (
                        <ArticleCard
                            key={article._id}
                            title={article.title}
                            slug={`${article.category.slug}/${article.slug}`}
                            author={article.author?.name || "Anonymous"}
                            category={article.category?.title}
                            excerpt={article.excerpt}
                            image={article.images?.[0]?.asset?.url || ""}
                            date={article.submittedDate}
                            likes={article.stats.likes}
                            views={article.stats.views}
                            comments={0} // 👈 placeholder (until you add comments)
                        />
                    ))}
                </div>

                {/* No results */}
                {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">
                            No articles found matching your criteria.
                        </p>
                        <Button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            variant="outline"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            <DontGo />
        </>
    );
}
