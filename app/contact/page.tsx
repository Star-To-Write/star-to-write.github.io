import { DontGo } from "@/components/DontGo";
import Link from "next/link";

export default function ContactUs() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-12">
          <h1
            className="text-5xl mb-6 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We'd love to hear from you. Whether you have questions about
            submissions, partnerships, or our mission, don't hesitate to reach
            out.
          </p>
        </div>

        {/* Primary Contact */}
        <div className="mb-12">
          <h3
            className="text-2xl mb-6 text-primary text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Primary Contact
          </h3>
          <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <h4
              className="text-xl mb-2 text-foreground"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Email
            </h4>
            <p
              className="text-muted-foreground mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              For inquiries, submissions, and general correspondence
            </p>
            <a
              href="mailto:startowrite@gmail.com"
              className="text-primary hover:text-primary/80 transition-colors text-lg"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              startowrite@gmail.com
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-12">
          <h3
            className="text-2xl mb-6 text-primary text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Follow Our Journey
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Instagram */}
            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/60 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h4
                className="text-lg mb-2 text-foreground"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Instagram
              </h4>
              <a
                href="https://www.instagram.com/startowrite/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                @startowrite
              </a>
            </div>

            {/* TikTok */}
            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/60 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
              <h4
                className="text-lg mb-2 text-foreground"
                style={{ fontFamily: "Georgia, serif" }}
              >
                TikTok
              </h4>
              <a
                href="https://www.tiktok.com/@startowrite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                @startowrite
              </a>
            </div>

            {/* Linktree */}
            <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/60 transition-all duration-300 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897.285 0 .57-.122.732-.365l2.39-3.118 2.39 3.118c.162.243.447.365.732.365.524 0 .973-.38 1.052-.897 0-.162 0-.323-.08-.486L12.635 9.95l3.506-5.116c.08-.162.08-.324.08-.486-.079-.517-.528-.897-1.052-.897-.285 0-.57.122-.732.365l-2.39 3.118L9.657 3.816c-.162-.243-.447-.365-.732-.365-.524 0-.973.38-1.052.897 0 .162 0 .324.08.486L11.459 9.95l-3.506 5.116z" />
                </svg>
              </div>
              <h4
                className="text-lg mb-2 text-foreground"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Linktree
              </h4>
              <a
                href="https://linktr.ee/startowrite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                All Links
              </a>
            </div>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="text-center bg-primary/10 border border-primary/30 rounded-xl p-6 mb-8">
          <h4
            className="text-lg mb-2 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Response Time
          </h4>
          <p
            className="text-muted-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We typically respond to emails within 2-3 business days. For urgent
            matters, please mention "URGENT" in your subject line.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary/10 border border-primary/30 rounded-xl p-8">
          <h3
            className="text-2xl mb-4 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ready to Share Your Voice?
          </h3>
          <p
            className="text-muted-foreground mb-6"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Join our literary community and contribute to meaningful
            conversations through writing.
          </p>
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <Link href="get-published">Submit Your Writing</Link>
          </button>
        </div>
      </div>
      <DontGo />
    </>
  );
}
