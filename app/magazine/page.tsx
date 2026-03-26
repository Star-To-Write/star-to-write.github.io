import MagazineClient from "@/components/MagazineClient";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600; // Revalidate every hour

type Magazine = {
    _id: string;
    title: string;
    slug: string;
    issue: number;
    issueType: "regular" | "mini";
    description: string;
    tags: string[];
    status: string;
    link: string;
    coverImage: {
        asset: {
            url: string;
        };
        alt: string;
    };
};

export default async function MagazinePage() {
    // Fetch all magazines
    const magazines: Magazine[] = await client.fetch(`
        *[_type == "magazine"] | order(issue desc) {
            _id,
            title,
            "slug": slug.current,
            issue,
            issueType,
            description,
            tags,
            status,
            link,
            coverImage {
                asset->{ url },
                alt
            }
        }
    `);

    // Separate published and coming soon magazines
    const publishedMagazines = magazines.filter(
        (mag) => mag.status === "Published",
    );
    const comingSoonMagazines = magazines.filter(
        (mag) => mag.status === "Coming Soon",
    );

    // For new behavior: highlight the newest published issue (regular or mini)
    const featuredMagazine = publishedMagazines[0];

    const remainingPublished = publishedMagazines.slice(1);
    const previousRegularIssues = remainingPublished.filter(
        (mag) => mag.issueType === "regular",
    );
    const miniIssues = remainingPublished.filter(
        (mag) => mag.issueType === "mini",
    );

    return (
        <MagazineClient
            featuredMagazine={featuredMagazine}
            previousRegularIssues={previousRegularIssues}
            miniIssues={miniIssues}
            comingSoonMagazines={comingSoonMagazines}
        />
    );
}
