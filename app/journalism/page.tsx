"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { SubscribeNews } from "@/components/SubscribeNews";
import { DontGo } from "@/components/DontGo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const categories = [
  "All",
  "Pop Culture",
  "Technology",
  "Health and Beauty",
  "Global Issues",
  "USA Updates",
];

const mockArticles = [
  {
    id: 1,
    title: "The Rise of Gen Z Influencers: Reshaping Entertainment Industry",
    author: "Emma Rodriguez",
    category: "Pop Culture",
    excerpt:
      "How young content creators are challenging traditional media and creating new paradigms in entertainment, from TikTok trends to streaming platform dominance...",
    image:
      "https://images.unsplash.com/photo-1678483789470-fdaef18a1d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjBjdWx0dXJlJTIwZW50ZXJ0YWlubWVudCUyMG5ld3N8ZW58MXx8fHwxNzU1NzMwMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 18, 2025",
    readTime: "5 min read",
    likes: 124,
    comments: 32,
    views: 2847,
  },
  {
    id: 2,
    title: "AI in Education: Revolutionary Changes Coming to Classrooms",
    author: "Marcus Chen",
    category: "Technology",
    excerpt:
      "Exploring how artificial intelligence is transforming learning experiences, from personalized tutoring systems to automated grading platforms...",
    image:
      "https://images.unsplash.com/photo-1696431284301-b09a8715edaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGNvbXB1dGVyfGVufDF8fHx8MTc1NTczMDExMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 17, 2025",
    readTime: "7 min read",
    likes: 89,
    comments: 18,
    views: 1923,
  },
  {
    id: 3,
    title: "Mental Health Awareness: The New Beauty Standard",
    author: "Sophia Kim",
    category: "Health and Beauty",
    excerpt:
      "How the beauty industry is shifting focus from external appearance to mental wellness, with brands promoting self-care and authenticity over perfection...",
    image:
      "https://images.unsplash.com/photo-1669355106052-b7456721510c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBiZWF1dHklMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NTU3MzAxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 16, 2025",
    readTime: "4 min read",
    likes: 156,
    comments: 41,
    views: 3201,
  },
  {
    id: 4,
    title: "Climate Crisis: Youth Activists Leading Global Change",
    author: "Alex Thompson",
    category: "Global Issues",
    excerpt:
      "An in-depth look at how young environmental activists worldwide are driving policy changes and raising awareness about climate action...",
    image:
      "https://images.unsplash.com/photo-1570358934836-6802981e481e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBpc3N1ZXMlMjB3b3JsZCUyMG5ld3N8ZW58MXx8fHwxNzU1NzMwMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    likes: 203,
    comments: 67,
    views: 4512,
  },
  {
    id: 5,
    title: "2025 Midterm Elections: Young Voter Turnout Predictions",
    author: "Jordan Williams",
    category: "USA Updates",
    excerpt:
      "Analyzing voter registration trends and political engagement among Gen Z voters ahead of the upcoming midterm elections...",
    image:
      "https://images.unsplash.com/photo-1618071264149-da6cfa159cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2ElMjBhbWVyaWNhJTIwcG9saXRpY3MlMjBnb3Zlcm5tZW50fGVufDF8fHx8MTc1NTczMDEyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 14, 2025",
    readTime: "6 min read",
    likes: 78,
    comments: 29,
    views: 1876,
  },
  {
    id: 6,
    title: "Streaming Wars: How Young Creators Are Winning",
    author: "Riley Martinez",
    category: "Pop Culture",
    excerpt:
      "The battle for viewership between traditional streaming platforms and emerging creator-led content, and what it means for the future of entertainment...",
    image:
      "https://images.unsplash.com/photo-1678483789470-fdaef18a1d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3AlMjBjdWx0dXJlJTIwZW50ZXJ0YWlubWVudCUyMG5ld3N8ZW58MXx8fHwxNzU1NzMwMTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 13, 2025",
    readTime: "5 min read",
    likes: 92,
    comments: 24,
    views: 2134,
  },
  {
    id: 7,
    title: "Cybersecurity Threats Targeting Students: What to Know",
    author: "Cameron Lee",
    category: "Technology",
    excerpt:
      "A comprehensive guide to digital safety for students, covering everything from social media privacy to protecting personal information online...",
    image:
      "https://images.unsplash.com/photo-1696431284301-b09a8715edaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGNvbXB1dGVyfGVufDF8fHx8MTc1NTczMDExMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 12, 2025",
    readTime: "6 min read",
    likes: 67,
    comments: 15,
    views: 1543,
  },
  {
    id: 8,
    title: "Breaking: Student Debt Relief Program Announced",
    author: "Taylor Johnson",
    category: "USA Updates",
    excerpt:
      "Latest developments in federal student loan forgiveness programs and what it means for current and future college students across America...",
    image:
      "https://images.unsplash.com/photo-1622223145461-271074da3e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3MlMjBqb3VybmFsaXNtfGVufDF8fHx8MTc1NTYzNjg4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "Jan 11, 2025",
    readTime: "4 min read",
    likes: 234,
    comments: 89,
    views: 5671,
  },
];

export default function JournalismPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-4xl mb-4 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Star to Write Journalistic Media
          </h1>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            In-depth reporting and analysis from young journalists covering the
            stories that matter to our generation.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-8">
          <SubscribeNews />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              placeholder="Search articles by title, author, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-base bg-input-background border-border rounded-xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:text-primary"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p
            className="text-sm text-muted-foreground text-center"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {selectedCategory === "All" ? "All Articles" : selectedCategory} •{" "}
            {filteredArticles.length} articles found
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p
              className="text-muted-foreground mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No articles found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
