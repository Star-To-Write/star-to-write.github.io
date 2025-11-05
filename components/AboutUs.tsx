export function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-12 text-center">
        <div
          className="text-xs tracking-widest text-primary uppercase mb-6"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          ABOUT US
        </div>

        <h2
          className="text-3xl lg:text-4xl mb-8 text-primary"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Our Mission
        </h2>

        <div className="max-w-4xl mx-auto">
          <p
            className="text-lg leading-relaxed text-foreground mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Star to Write is a youth-led organization dedicated to giving
            everyone a voice through writing. We believe that everyone
            regardless of their skin color, beliefs, or experiences deserves a
            platform not only to showcase their writing but also to express
            themselves freely.
          </p>

          <p
            className="text-lg leading-relaxed text-foreground mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We welcome all forms of writing, from stories to research papers to
            personal reflections, and we aim to unite both readers and writers.
            We want to create change. We want to give you a voice.
          </p>

          <p
            className="text-xl text-primary italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            So work with us, submit your writing, and be a Star to Write.
          </p>
        </div>
      </div>
    </div>
  );
}
