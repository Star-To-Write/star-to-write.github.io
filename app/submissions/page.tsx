"use client";

import { useState } from "react";
import { Search, Filter, SortAsc } from "lucide-react";
import { SubmissionCard } from "@/components/SubmissionCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { DontGo } from "@/components/DontGo";

const categories = [
  "All Categories",
  "Short Stories",
  "Opinions",
  "Poetry",
  "Journalistic Pieces",
  "Writing to Spread Awareness",
  "Essays",
  "Research Papers",
  "Other Creative Works",
];

const mockSubmissions = [
  {
    id: 1,
    title: "The Weight of Words",
    author: "Maya Chen",
    category: "Poetry",
    excerpt:
      "In the silence between heartbeats, I find the rhythm of forgotten dreams. Each word carries the weight of unspoken truths...",
    image:
      "https://images.unsplash.com/photo-1705754139930-e73d4190fd53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdyaXRlciUyMHBvZXRyeXxlbnwxfHx8fDE3NTU3Mjg2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 15, 2025",
    likes: 42,
    comments: 8,
    views: 156,
  },
  {
    id: 2,
    title: "Climate Change: A Generation's Burden",
    author: "Alex Rodriguez",
    category: "Essays",
    excerpt:
      "As the youngest generation to inherit a warming planet, we carry the responsibility of change. This essay explores our role in environmental activism...",
    image:
      "https://images.unsplash.com/photo-1570929057588-6952f7dd2305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3NheSUyMHJlc2VhcmNoJTIwcGFwZXJ8ZW58MXx8fHwxNzU1NzI4NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 12, 2025",
    likes: 67,
    comments: 15,
    views: 234,
  },
  {
    id: 3,
    title: "The Stranger's Gift",
    author: "Jordan Kim",
    category: "Short Stories",
    excerpt:
      "A mysterious package arrives at midnight, containing nothing but a single letter and a key. What follows changes everything I thought I knew about my family...",
    image:
      "https://images.unsplash.com/photo-1612969305991-345f46179853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yeXRlbGxpbmclMjBqb3VybmFsfGVufDF8fHx8MTc1NTcyODYwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 10, 2025",
    likes: 89,
    comments: 23,
    views: 312,
  },
  {
    id: 4,
    title: "Breaking: Youth Voices in Local Politics",
    author: "Sam Chen",
    category: "Journalistic Pieces",
    excerpt:
      "An investigation into how young people are making their voices heard in local government, despite facing systematic barriers to participation...",
    image:
      "https://images.unsplash.com/photo-1558009250-d3d2229fdf28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3VybmFsaXNtJTIwYXJ0aWNsZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzU1NzI4NjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 8, 2025",
    likes: 73,
    comments: 19,
    views: 287,
  },
  {
    id: 5,
    title: "Mental Health Awareness: Breaking the Silence",
    author: "Riley Johnson",
    category: "Writing to Spread Awareness",
    excerpt:
      "It's time we talk openly about mental health in our schools and communities. This piece explores the importance of destigmatizing mental health conversations...",
    image:
      "https://images.unsplash.com/photo-1689023540541-59aa2513b750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmclMjBub3RlYm9va3xlbnwxfHx8fDE3NTU3Mjg2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 5, 2025",
    likes: 95,
    comments: 31,
    views: 421,
  },
  {
    id: 6,
    title: "The Power of Dissent",
    author: "Casey Martinez",
    category: "Opinions",
    excerpt:
      "In a world that often demands conformity, the act of respectful dissent becomes revolutionary. Here's why we need more diverse voices in every conversation...",
    image:
      "https://images.unsplash.com/photo-1598363431659-330370aaaa7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGluaW9uJTIwd3JpdGluZyUyMGRlYmF0ZXxlbnwxfHx8fDE3NTU3Mjg2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 3, 2025",
    likes: 58,
    comments: 27,
    views: 198,
  },
];

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("newest");

  const filteredSubmissions = mockSubmissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      submission.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return b.likes - a.likes;
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl mb-4 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Submissions
          </h1>
          <p
            className="text-muted-foreground max-w-2xl"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Discover amazing works from talented young writers across all
            categories and genres.
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 mb-8 text-muted-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
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
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
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
                  <SelectItem value="popular">Most Liked</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Showing {sortedSubmissions.length} of {mockSubmissions.length}{" "}
            submissions
          </p>
        </div>

        {/* Submissions Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {sortedSubmissions.map((submission) => (
            <SubmissionCard key={submission.id} {...submission} />
          ))}
        </div>

        {/* No Results */}
        {sortedSubmissions.length === 0 && (
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
      </div>

      <DontGo />
    </>
  );
}
