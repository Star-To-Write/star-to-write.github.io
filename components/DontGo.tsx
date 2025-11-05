import { Stars, Heart } from "lucide-react";
import { Button } from "./ui/Button";

export function DontGo() {
  return (
    <div className="py-16 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Decorative stars */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Stars className="text-[#d4af37]/60" size={24} />
          <Stars className="text-primary" size={32} />
          <Heart className="text-[#d4af37]/80" size={28} />
          <Stars className="text-primary" size={32} />
          <Stars className="text-[#d4af37]/60" size={24} />
        </div>
        {/* Main message */}
        <h3
          className="text-2xl mb-4 text-primary"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Leaving so soon?
        </h3>
        <p
          className="text-lg mb-6 text-foreground"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Stay and count the stars with us
        </p>
        <p
          className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          There's so much more to explore in our literary universe. From
          thought-provoking essays to creative stories, from breaking news to
          personal reflections - every piece here is written by passionate young
          voices who believe in the power of words to create change.
        </p>

        <div className="flex justify-center items-center">
          <Button
            className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90 px-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Explore More Stories
          </Button>
        </div>
        {/* Subtle tagline */}
        <div className="mt-3 pt-3">
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ✨ Because every voice deserves to shine among the stars ✨
          </p>
        </div>
      </div>
    </div>
  );
}
