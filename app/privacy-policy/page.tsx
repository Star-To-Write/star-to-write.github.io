import { DontGo } from "@/components/DontGo";

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-12">
          <h1
            className="text-5xl mb-6 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Privacy Policy & Terms
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 mb-12">
          <h2
            className="text-3xl mb-6 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Star to Write ✨ Terms and Conditions
          </h2>

          <div
            className="space-y-6 text-muted-foreground"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              lineHeight: "1.7",
            }}
          >
            <p className="text-sm text-muted-foreground/80">
              <strong>Effective Date:</strong> July 12, 2025
            </p>

            <p>
              Welcome to Star to Write ("we," "our," or "us"). By accessing or
              using our website, services, submitting content, or engaging with
              us on social media or through email, you agree to be bound by
              these Terms and Conditions ("Terms"). If you do not agree, please
              do not use our services.
            </p>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                About Us
              </h3>
              <p>
                Star to Write is a nonprofit organization dedicated to uplifting
                young voices through writing, creativity, and self-expression.
                Our platform offers opportunities for writers to be featured,
                collaborate, and grow.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Eligibility
              </h3>
              <p>
                To participate in our programs or submit content, you must be at
                least 13 years old. If you are any younger, you must have
                written and signed permission from your parent/guardian allowing
                you to use our services.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Content Submission
              </h3>
              <p>
                By submitting your writing, artwork, or any creative content to
                Star to Write, you:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Confirm the work is original and created by you.</li>
                <li>
                  Grant us a non-exclusive, royalty-free license to publish,
                  edit, and share your work on our website, social media,
                  newsletters, or other promotional materials.
                </li>
                <li>
                  Retain full ownership of your work. We do not take away your
                  rights to your creation.
                </li>
                <li>
                  Understand that your submission may be lightly edited for
                  grammar, formatting, or clarity.
                </li>
              </ul>
              <p className="mt-3">
                We will never sell your work, and we will always credit you.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Code of Conduct
              </h3>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Harass, bully, or threaten others.</li>
                <li>Submit offensive, harmful, or plagiarized content.</li>
                <li>
                  Pretend to be someone else or misrepresent your age or
                  identity.
                </li>
              </ul>
              <p className="mt-3">
                We reserve the right to remove any content or block users who
                violate these terms.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Website Usage
              </h3>
              <p>You may not use our website to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Distribute malware, spam, or viruses.</li>
                <li>Collect data from others without permission.</li>
                <li>Break any laws or violate anyone's rights.</li>
              </ul>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Changes to These Terms
              </h3>
              <p>
                We may update these Terms occasionally. Any updates will be
                posted here, and by continuing to use our services, you agree to
                the new terms.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-8 lg:p-12 mb-12">
          <h2
            className="text-3xl mb-6 text-primary"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Star to Write ✨ Privacy Policy
          </h2>

          <div
            className="space-y-6 text-muted-foreground"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              lineHeight: "1.7",
            }}
          >
            <p className="text-sm text-muted-foreground/80">
              <strong>Effective Date:</strong> July 12, 2025
            </p>

            <p>
              At Star to Write, your privacy matters to us. This policy explains
              what information we collect, why we collect it, and how we keep it
              safe.
            </p>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                What We Collect
              </h3>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>
                  <strong>Contact Info:</strong> Your name, email address, or
                  social media handle (only if you share it with us).
                </li>
                <li>
                  <strong>Submissions:</strong> Any writing, artwork, or media
                  you send to us.
                </li>
                <li>
                  <strong>Optional Demographics:</strong> Age, pronouns,
                  country, a picture of you (only if provided voluntarily).
                </li>
                <li>
                  <strong>Technical Info:</strong> We may use tools like Google
                  Analytics to understand how visitors use our website (e.g.
                  which pages are most popular).
                </li>
              </ul>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                How We Use Your Info
              </h3>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Review and publish your submissions.</li>
                <li>Contact you about your work or upcoming opportunities.</li>
                <li>Improve our website and outreach.</li>
              </ul>
              <p className="mt-3">
                <strong>
                  We do not sell, trade, or share your information with third
                  parties for profit. We do not sell any data at all.
                </strong>
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                How We Protect Your Info
              </h3>
              <p>
                We take reasonable steps to protect your information from
                unauthorized access, loss, or misuse. Access to submissions is
                limited to our team and trusted volunteers.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your Rights
              </h3>
              <p>You can request to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>See what info we have about you.</li>
                <li>Ask us to correct or delete your info.</li>
                <li>Withdraw a submission at any time.</li>
              </ul>
              <p className="mt-3">
                Just email us at Startowrite@gmail.com and we'll respond
                promptly.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Social Media and Third-Party Links
              </h3>
              <p>
                We may link to other sites or feature your work on social media.
                Please know we're not responsible for their privacy practices.
                Always check their policies too.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Children's Privacy
              </h3>
              <p>
                We do not knowingly collect personal information from children
                under 13 without parental consent. If you believe we've
                collected such info, please contact us and we will delete it.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Changes to This Policy
              </h3>
              <p>
                We may update this policy as needed. All changes will be posted
                on this page.
              </p>
            </div>

            <div>
              <h3
                className="text-xl mb-3 text-primary"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Questions?
              </h3>
              <p>
                If you have any questions about our Terms or Privacy Policy,
                please email us at Startowrite@gmail.com or DM us on
                Instagram/TikTok at @Startowrite.
              </p>
              <p className="mt-3">
                Thank you for being part of Star to Write ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      <DontGo />
    </>
  );
}
