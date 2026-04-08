import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import OrganizationsClient from "@/components/OrganizationsClient";
import { type Organization } from "@/lib/types";
import { client } from "@/sanity/lib/client";
import { organizationSubjects as subjects } from "@/lib/organizationSubjects";
// interface ResourceRequest {
//     label: string;
//     value: string;
// }

export default async function FoundationPage() {
    // Fetch submissions
    const submissionsQuery = `
        *[_type == "organization"]{
          _id,
          name,
          "slug": slug.current,
          "logo": logo.asset->url,
          "location": { "country": location, state },
          subject,
          description,
          involvement,
          goal,
          scope,
          "openRoles": roles,
          "applicationLink": link,
          socials
        }`;
    const organizations: Organization[] = await client.fetch(submissionsQuery);

    console.log(organizations);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative py-16 px-6 lg:px-12 bg-gradient-to-br from-card/40 via-card/30 to-transparent">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Decorative elements */}
                    <div className="absolute top-8 left-8 w-2 h-2 bg-[#d4af37]/30 rounded-full animate-pulse"></div>
                    <div className="absolute top-12 right-12 w-1 h-1 bg-[#d4af37]/50 rounded-full animate-ping"></div>
                    <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-[#d4af37]/40 rounded-full animate-pulse"></div>

                    <div className="relative z-10">
                        <h1
                            className="text-5xl mb-6 text-primary"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            Star to Write Foundation
                        </h1>
                        <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>

                        <p
                            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Connecting communities, empowering growth, and
                            helping you discover the resources you need to
                            shine.
                        </p>

                        <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl p-6 max-w-4xl mx-auto">
                            <p
                                className="text-muted-foreground leading-relaxed"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                Our foundation exists to feature and support
                                organizations while helping individuals find
                                resources that Star to Write may not directly
                                provide. We believe in the power of connection
                                and collaboration to create opportunities for
                                everyone to grow and succeed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mx-12 lg:mx-0">
                <Button
                    className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    asChild
                >
                    <a
                        href="https://forms.gle/dYo9nyCKj4jbgeEx7"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Star size={16} className="mr-2 mx-3" />
                        Be Featured On The List
                    </a>
                </Button>
            </div>

            {/* Client-side component handles search, filter, sort */}
            <div className="p-12">
                <OrganizationsClient
                    organizations={organizations}
                    categories={subjects}
                />
            </div>

            {/* Call to Action */}
            <div className="py-16 px-6 lg:px-12 bg-gradient-to-br from-[#d4af37]/5 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        className="text-2xl mb-6 text-primary"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        Ready to Make a Difference?
                    </h2>
                    <p
                        className="text-muted-foreground mb-8 leading-relaxed"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Whether you're looking for resources or want to be
                        featured, we're here to help connect you with the right
                        opportunities.
                    </p>
                </div>
            </div>
        </div>
    );
}
