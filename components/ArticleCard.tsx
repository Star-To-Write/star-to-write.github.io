import { Heart, MessageCircle, Share2, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
    title: string;
    author: string;
    slug: string;
    category: string;
    excerpt: string;
    image: string;
    date: string;
    likes: number;
    comments: number;
    views: number;
}

export function ArticleCard({
    title,
    author,
    slug,
    category,
    excerpt,
    image,
    date,
    likes,
    comments,
    views,
}: ArticleCardProps) {
    const handleShare = () => {
        navigator.clipboard.writeText(
            `Check out "${title}" by ${author} on Star to Write Journalistic Media!`,
        );
    };
    return (
        <div className="group bg-card/40 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300">
            {/* Image */}
            <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category */}
                <div className="absolute top-3 left-3">
                    <span className="bg-[#d4af37]/90 text-primary-foreground px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                    <span>{new Date(date).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{views.toLocaleString()}</span>
                    </div>
                </div>

                <h3 className="text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3">
                    By {author}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {excerpt}
                </p>

                {/* Stats (no interaction) */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Heart size={16} />
                            <span>{likes}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            <span>{comments}</span>
                        </div>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            {" "}
                            <Share2 size={16} />{" "}
                        </button>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary-foreground hover:bg-primary"
                        asChild
                    >
                        <Link href={slug}>Read Article</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
