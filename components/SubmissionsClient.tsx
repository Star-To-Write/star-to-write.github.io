// app/submissions/SubmissionsClient.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Search, Filter, SortAsc } from "lucide-react";
import { SubmissionCard } from "./SubmissionCard";
import type { Submission, Category } from "@/lib/types";

interface SubmissionsClientProps {
    submissions: Submission[];
    categories: Category[];
}

export default function SubmissionsClient({
    submissions,
    categories,
}: SubmissionsClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("newest");

    // Filter by search term and category
    const filtered = submissions.filter((s) => {
        const matchesSearch =
            s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.author.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All Categories" ||
            s.category.title === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Sort filtered submissions
    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return (
                    new Date(b.submittedDate).getTime() -
                    new Date(a.submittedDate).getTime()
                );
            case "oldest":
                return (
                    new Date(a.submittedDate).getTime() -
                    new Date(b.submittedDate).getTime()
                );
            // case "popular":
            //     return (b.likes || 0) - (a.likes || 0);
            // case "views":
            //     return (b.views || 0) - (a.views || 0);
            default:
                return 0;
        }
    });

    return (
        <>
            {/* Search and Filters */}
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 mb-8 text-muted-foreground">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            size={20}
                        />
                        <Input
                            placeholder="Search submissions by title, author, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-input-background border-border"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-4">
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-48 bg-input-background border-border">
                                <div className="flex items-center gap-2">
                                    <Filter size={16} />
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Categories">
                                    All Categories
                                </SelectItem>
                                {categories.map((c) => (
                                    <SelectItem key={c.slug} value={c.title}>
                                        {c.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-40 bg-input-background border-border">
                                <div className="flex items-center gap-2">
                                    <SortAsc size={16} />
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                                <SelectItem value="popular">
                                    Most Liked
                                </SelectItem>
                                <SelectItem value="views">
                                    Most Viewed
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <p
                className="text-sm text-muted-foreground mb-6"
                style={{ fontFamily: "Inter, sans-serif" }}
            >
                Showing {sorted.length} of {submissions.length} submissions
            </p>

            {/* Submissions Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {sorted.map((s) => (
                    <SubmissionCard key={s.title} {...s} />
                ))}
            </div>

            {/* No Results */}
            {sorted.length === 0 && (
                <div className="text-center py-12">
                    <p
                        className="text-muted-foreground mb-4"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        No submissions found matching your criteria.
                    </p>
                    <Button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("All Categories");
                        }}
                        variant="outline"
                        className="border-[#d4af37]/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                        Clear Filters
                    </Button>
                </div>
            )}
        </>
    );
}
