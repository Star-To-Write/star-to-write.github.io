"use client";

import {
  ExternalLink,
  FileText,
  Star,
  Users,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DontGo } from "@/components/DontGo";

export default function GetPublishedPage() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-12">
          <h1
            className="text-5xl mb-6 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            You want to get published for free?
          </h1>
          <h2
            className="text-3xl mb-8 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Star to Write got your back!
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p
            className="text-muted-foreground text-lg max-w-3xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Join our community of young writers and get your voice heard. We
            offer two exciting publishing opportunities to showcase your talent.
          </p>
        </div>

        {/* Regular Publication Section */}
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3
                className="text-2xl text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Regular Publication
              </h3>
              <p
                className="text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Submit your work to be featured on our main platform
              </p>
            </div>
          </div>

          <p
            className="text-muted-foreground leading-relaxed mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.125rem",
              lineHeight: "1.7",
            }}
          >
            Share your creative writing, poetry, short stories, essays, research
            papers, or any other written work with our community. Our team
            reviews all submissions and publishes exceptional pieces on our
            website, giving you the platform to reach readers worldwide.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Global audience reach
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <Award className="w-6 h-6 text-primary mx-auto mb-2" />
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Professional publication
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                All genres welcome
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeD014oOgdea-AwaF4W2LrIc7AbJXxcAqE4WWGwcGWwUr8WfA/viewform",
                  "_blank"
                )
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Submit for Regular Publication
            </Button>
          </div>
        </div>

        {/* Mini Issue Section */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-xl p-8 lg:p-12 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3
                className="text-2xl text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Upcoming Mini Issue ✨
              </h3>
              <p
                className="text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Be featured in our exclusive magazine publication
              </p>
            </div>
          </div>

          <div className="bg-primary/20 border border-primary/40 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span
                className="text-primary"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: "500" }}
              >
                Limited Time Opportunity
              </span>
            </div>
            <p
              className="text-muted-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We are accepting only{" "}
              <strong className="text-primary">13 pieces</strong> for our
              upcoming mini magazine issue. This is a special opportunity to be
              featured in a curated publication alongside other exceptional
              young writers.
            </p>
          </div>

          <p
            className="text-muted-foreground leading-relaxed mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.125rem",
              lineHeight: "1.7",
            }}
          >
            Submit your best work for consideration in our mini issue. Selected
            pieces will be featured in a beautifully designed digital magazine.
            <strong className="text-primary">
              {" "}
              Don't worry if you're not selected
            </strong>{" "}
            - all submissions that aren't accepted for the mini issue will be
            published regularly on our platform.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <span
                  className="text-primary"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: "500" }}
                >
                  Exclusive Magazine Feature
                </span>
              </div>
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Selected work will be featured in our special mini magazine
                issue
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-primary" />
                <span
                  className="text-primary"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: "500" }}
                >
                  Guaranteed Publication
                </span>
              </div>
              <p
                className="text-sm text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Even if not selected for the mini issue, your work will be
                published regularly
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSd66LoE-7yADjGkHnYlDk2fRlh18jJ9cUXBCytQLMEj30GuXA/viewform",
                  "_blank"
                )
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Star className="w-4 h-4 mr-2" />
              Submit for Mini Issue
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-card/30 border border-border rounded-xl p-8">
          <h3
            className="text-2xl mb-4 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ready to Share Your Voice?
          </h3>
          <p
            className="text-muted-foreground mb-6 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Join hundreds of young writers who have found their platform with
            Star to Write. Your story matters, and we're here to help you tell
            it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSeD014oOgdea-AwaF4W2LrIc7AbJXxcAqE4WWGwcGWwUr8WfA/viewform",
                  "_blank"
                )
              }
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Regular Submission
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSd66LoE-7yADjGkHnYlDk2fRlh18jJ9cUXBCytQLMEj30GuXA/viewform",
                  "_blank"
                )
              }
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Mini Issue Submission
            </Button>
          </div>
        </div>
      </div>

      <DontGo />
    </>
  );
}
