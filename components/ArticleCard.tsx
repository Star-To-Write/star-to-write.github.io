import { useState } from "react";
import { Heart, MessageCircle, Share2, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
interface ArticleCardProps {
  id: number;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  views: number;
}

export function ArticleCard({
  id,
  title,
  author,
  category,
  excerpt,
  image,
  date,
  readTime,
  likes: initialLikes,
  comments,
  views,
}: ArticleCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Check out "${title}" by ${author} on Star to Write Journalistic Media!`
    );
  };

  return (
    <div className="group bg-card/40 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300">
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="bg-[#d4af37]/90 text-primary-foreground px-3 py-1 rounded-full text-xs uppercase tracking-wider"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {category}
          </span>
        </div>

        {/* Read Time */}
        <div className="absolute top-3 right-3">
          <div className="bg-[#0b132b]/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Clock size={12} />
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {date}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye size={12} />
            <span>{views.toLocaleString()}</span>
          </div>
        </div>

        <h3
          className="text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h3>

        <p
          className="text-sm text-muted-foreground mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          By {author}
        </p>

        <p
          className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {excerpt}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isLiked
                  ? "text-red-500"
                  : "text-muted-foreground hover:text-red-500"
              }`}
            >
              <Heart size={16} className={isLiked ? "fill-current" : ""} />
              <span>{likes}</span>
            </button>

            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle size={16} />
              <span>{comments}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Share2 size={16} />
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary-foreground hover:bg-primary"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Read Article
          </Button>
        </div>
      </div>
    </div>
  );
}
