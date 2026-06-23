import { client } from "@/sanity/lib/client";
import { NextRequest } from "next/server";

// /api/tags.ts
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    const data = await client.fetch<string[]>(
        '*[_type == "tag" && category->title == $category].name',
        { category },
        {
            next: {
                tags: ["category", "tag"],
            },
        },
    );
    data.unshift("All");

    return Response.json(data);
}
