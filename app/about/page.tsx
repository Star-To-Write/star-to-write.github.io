import { DontGo } from "@/components/DontGo";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-12">
          <h1
            className="text-5xl mb-6 text-[#d4af37]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            About Star to Write
          </h1>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8"></div>
        </div>

        {/* Main Organization Description */}
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 mb-12">
          <div className="prose prose-lg max-w-none">
            <p
              className="text-muted-foreground leading-relaxed mb-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1.125rem",
                lineHeight: "1.7",
              }}
            >
              Star to Write is a youth-led nonprofit organization committed to
              empowering young voices through writing, art, and creative
              expression. Our goal is to give everybody a voice by providing
              accessible publishing opportunities for emerging writers and
              artists, ensuring that creativity is not limited by financial or
              institutional barriers.
            </p>

            <p
              className="text-muted-foreground leading-relaxed mb-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1.125rem",
                lineHeight: "1.7",
              }}
            >
              Our publications feature a wide range of work—from literature and
              journalism to visual art—highlighting the perspectives of youth
              across the globe. By offering free and inclusive platforms, we
              foster a community where young creators can share their stories,
              develop their skills, and connect with a wider audience.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="relative bg-gradient-to-br from-card/40 via-card/50 to-card/30 backdrop-blur-sm border border-border rounded-3xl p-8 lg:p-12 mb-12 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-4 left-6 w-2 h-2 bg-[#d4af37]/30 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-[#d4af37]/50 rounded-full animate-ping"></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-[#d4af37]/40 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-12 right-12 w-1 h-1 bg-[#d4af37]/60 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-16 left-20 w-1 h-1 bg-[#d4af37]/30 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3
                className="text-2xl mb-2 text-[#d4af37]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Meet Our Founder
              </h3>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
                <svg
                  className="w-4 h-4 text-[#d4af37]/70"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Julia's Photo */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  {/* Decorative rings around photo */}
                  <div
                    className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 rounded-full animate-spin"
                    style={{ animationDuration: "20s" }}
                  ></div>
                  <div
                    className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent rounded-full animate-spin"
                    style={{
                      animationDuration: "15s",
                      animationDirection: "reverse",
                    }}
                  ></div>

                  {/* Main photo container */}
                  <div className="relative w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#d4af37]/20 hover:ring-[#d4af37]/40 transition-all duration-500 hover:scale-105 group">
                    <Image
                      src="/staff/julia-president.jpeg"
                      fill
                      alt="Julia Philip, Founder of Star to Write"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Cute sparkle overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 left-4 w-2 h-2">
                        <svg
                          className="w-full h-full text-[#d4af37]/80 animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" />
                        </svg>
                      </div>
                      <div className="absolute top-8 right-6 w-1.5 h-1.5">
                        <svg
                          className="w-full h-full text-[#d4af37]/60 animate-ping"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" />
                        </svg>
                      </div>
                      <div className="absolute bottom-6 left-8 w-1 h-1">
                        <svg
                          className="w-full h-full text-[#d4af37]/70 animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ animationDelay: "1s" }}
                        >
                          <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Floating celestial elements around photo */}
                  <div
                    className="absolute -top-8 -left-8 w-8 h-8 text-[#d4af37] animate-bounce"
                    style={{ animationDelay: "0s", animationDuration: "4s" }}
                  >
                    <svg
                      className="w-full h-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>

                  <div
                    className="absolute -top-4 -right-8 w-6 h-6 text-amber-300 animate-pulse"
                    style={{ animationDelay: "1s", animationDuration: "3s" }}
                  >
                    🌙
                  </div>

                  <div
                    className="absolute -bottom-6 -right-6 w-7 h-7 text-orange-400 animate-spin"
                    style={{ animationDelay: "2s", animationDuration: "8s" }}
                  >
                    ☀️
                  </div>

                  <div
                    className="absolute -bottom-8 -left-6 w-5 h-5 text-blue-400 animate-bounce"
                    style={{ animationDelay: "0.5s", animationDuration: "5s" }}
                  >
                    🌍
                  </div>

                  <div
                    className="absolute top-4 -right-12 w-6 h-6 text-purple-400 animate-pulse"
                    style={{ animationDelay: "1.5s", animationDuration: "4s" }}
                  >
                    🪐
                  </div>

                  <div
                    className="absolute bottom-4 -left-10 w-4 h-4 text-pink-300 animate-bounce"
                    style={{
                      animationDelay: "2.5s",
                      animationDuration: "3.5s",
                    }}
                  >
                    ☄️
                  </div>
                </div>
              </div>

              {/* Founder Description */}
              <div className="relative">
                {/* Cute decorative element */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#d4af37]/70"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>

                <div className="bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-2xl p-6 border border-[#d4af37]/10">
                  <h4
                    className="text-2xl mb-2 text-[#d4af37] bg-gradient-to-r from-[#d4af37] to-[#d4af37]/80 bg-clip-text"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Julia Philip
                  </h4>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/20">
                      <span
                        className="text-[#d4af37]/80"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.875rem",
                        }}
                      >
                        💖 Passionate Founder
                      </span>
                    </div>
                  </div>

                  <p
                    className="text-muted-foreground leading-relaxed mb-4 relative"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1.125rem",
                      lineHeight: "1.7",
                    }}
                  >
                    <span className="text-[#d4af37]/40 text-2xl absolute -left-2 -top-1">
                      "
                    </span>
                    Founded by Julia Philip, a young student whose passion for
                    helping others inspired her to create a space where youth
                    could be heard, Star to Write reflects both her vision and
                    values.
                  </p>
                  <p
                    className="text-muted-foreground leading-relaxed relative"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "1.125rem",
                      lineHeight: "1.7",
                    }}
                  >
                    Through the organization, she has found comfort and
                    friendship in her team, while leading with dedication and a
                    commitment to amplifying diverse voices.
                    <span className="text-[#d4af37]/40 text-2xl absolute -right-1 -bottom-2">
                      "
                    </span>
                  </p>

                  {/* Cute heart accent */}
                  <div className="flex items-center justify-center mt-6">
                    <div className="flex items-center gap-1 text-[#d4af37]/60">
                      <span className="animate-pulse">💝</span>
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: "Georgia, serif",
                          fontStyle: "italic",
                        }}
                      >
                        Creating magic through words
                      </span>
                      <span className="animate-pulse">💝</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 mb-12">
          <div className="text-center mb-8">
            <h3
              className="text-2xl mb-2 text-[#d4af37]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Our Amazing Team
            </h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
              <svg
                className="w-4 h-4 text-[#d4af37]/70"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
            </div>
            <p
              className="text-muted-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Meet the passionate individuals who make Star to Write possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-xl p-6 border border-[#d4af37]/10 text-center hover:bg-[#d4af37]/10 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h4
                className="text-lg mb-1 text-[#d4af37]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Sarah Martinez
              </h4>
              <p
                className="text-sm text-[#d4af37]/80 mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Content Editor
              </p>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Passionate about refining voices and bringing stories to life
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-xl p-6 border border-[#d4af37]/10 text-center hover:bg-[#d4af37]/10 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h4
                className="text-lg mb-1 text-[#d4af37]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Alex Chen
              </h4>
              <p
                className="text-sm text-[#d4af37]/80 mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Visual Designer
              </p>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Creating beautiful layouts and engaging visual experiences
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-xl p-6 border border-[#d4af37]/10 text-center hover:bg-[#d4af37]/10 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <h4
                className="text-lg mb-1 text-[#d4af37]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Jordan Kim
              </h4>
              <p
                className="text-sm text-[#d4af37]/80 mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Social Media Manager
              </p>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Connecting our community and spreading literary love
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-xl p-6 border border-[#d4af37]/10 text-center hover:bg-[#d4af37]/10 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h4
                className="text-lg mb-1 text-[#d4af37]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Riley Thompson
              </h4>
              <p
                className="text-sm text-[#d4af37]/80 mb-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Community Outreach
              </p>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Building bridges and fostering connections worldwide
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p
              className="text-muted-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Together, we're building a global community of creative voices
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 mb-12">
          <div className="prose prose-lg max-w-none">
            <p
              className="text-muted-foreground leading-relaxed mb-6"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1.125rem",
                lineHeight: "1.7",
              }}
            >
              At Star to Write, we believe in the power of storytelling to
              inspire change, cultivate empathy, and strengthen communities. Our
              mission is to equip the next generation of creators with the
              opportunities and visibility they deserve, while building a global
              network dedicated to the advancement of youth voices.
            </p>

            <div className="text-center mt-8 p-6 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg">
              <p
                className="text-[#d4af37] leading-relaxed"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                }}
              >
                Empowering young voices through writing, art, and creative
                expression across the globe.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3
            className="text-2xl mb-6 text-[#d4af37]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ready to Share Your Voice?
          </h3>
          <Button
            className="bg-[#d4af37] text-[#d4af37]-foreground hover:bg-[#d4af37]/90 px-8 py-3 rounded-lg transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Link href="/get-published">Submit Your Writing</Link>
          </Button>
        </div>
      </div>
      <DontGo />
    </>
  );
}
