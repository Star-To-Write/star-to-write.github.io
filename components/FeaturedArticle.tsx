import { Button } from "./ui/Button";

export function FeaturedArticle() {
  // TODO: Find featured article and make dynamic
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-12">
        <div
          className="text-xs tracking-widest text-primary uppercase mb-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          UNLOCKED:
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              className="text-4xl lg:text-5xl mb-6 text-primary"
              style={{ fontFamily: "Georgia, serif" }}
            >
              THE MIDNIGHT
              <br />
              <span className="text-foreground">MANUSCRIPT</span>
            </h1>

            <p
              className="text-lg italic text-muted-foreground mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "I met a rather unusual spirit on a cliff. It had four legs and
              spoke of dreams."
            </p>

            <div className="mb-8">
              <h3
                className="text-lg mb-4 text-foreground"
                style={{ fontFamily: "Georgia, serif" }}
              >
                About The Story:
              </h3>
              <p
                className="text-muted-foreground leading-relaxed mb-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                A haunting tale of midnight encounters and mystical beings that
                blur the line between reality and dreams. This piece explores
                themes of connection, loss, and the ethereal nature of memory
                through the eyes of a young writer discovering ancient secrets.
              </p>
              <p
                className="text-muted-foreground leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                The narrative weaves together elements of magical realism with
                contemporary storytelling, creating an atmosphere that lingers
                long after the final page. Written by emerging author Maya Chen,
                this piece represents the innovative voice of Gen Z literature.
              </p>
            </div>

            <Button
              className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90 px-8 py-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              READ MORE →
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-[#d4af37]/20 to-transparent">
              <img
                src="https://images.unsplash.com/photo-1742382717619-71c261a37b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmFyeSUyMHdyaXRpbmclMjBib29rJTIwcGFnZXN8ZW58MXx8fHwxNzU1NzI3OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="The Midnight Manuscript"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
