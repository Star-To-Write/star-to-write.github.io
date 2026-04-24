import { Submission } from "@/lib/types";
import { client } from "@/sanity/lib/client";
import { NextRequest } from "next/server";

// /api/submissions.ts
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    const allSubmissions = `
    *[_type == "submission" && category->title==$category]{
      "id": _id,
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
      tags[]->{
        name
      },
      category->{
        title,
        "slug": slug.current
      }
    } | order(submittedDate desc)[0..3]
    
    `;
    const data = await client.fetch<Submission[]>(
        allSubmissions,
        { category },
        { perspective: "published" },
    );

    console.log(data);

    return Response.json(data);
}
