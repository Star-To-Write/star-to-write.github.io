// app/submissions/page.tsx
import SubmissionsClient from "@/components/SubmissionsClient";
import type { Submission, Category } from "@/lib/types";
import { client } from "@/sanity/lib/client";

export default async function SubmissionsPage() {
    // Fetch categories
    const categoriesQuery = `
    *[_type == "category"]{
      title,
      "slug": slug.current
    }`;
    const categories: Category[] = await client.fetch(categoriesQuery);

    // Fetch submissions
    const submissionsQuery = `
    *[_type == "submission"]{



        title,
  "slug": slug.current,
  excerpt,
  submittedDate,
  images[]{
    asset->{
      url
    },
    alt
  },
  author->{
    name,
    anonymous
  },
  category->{
    title,
    "slug": slug.current
  }

    }`;
    const submissions: Submission[] = await client.fetch(submissionsQuery);

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1
                    className="text-4xl mb-4 text-primary"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Submissions
                </h1>
                <p
                    className="text-muted-foreground max-w-2xl"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Discover amazing works from talented young writers across
                    all categories and genres.
                </p>
            </div>

            {/* Client-side component handles search, filter, sort */}
            <SubmissionsClient
                submissions={submissions}
                categories={categories}
            />
        </div>
    );
}
