import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const submissionId = url.searchParams.get("submissionId");
    const galleryId = url.searchParams.get("galleryId");

    if (!submissionId && !galleryId) {
        return NextResponse.json(
            { error: "submissionId or galleryId is required" },
            { status: 400 },
        );
    }

    const query = `*[_type == "comment" && ${
        submissionId ? "submission._ref == $id" : "gallery._ref == $id"
    }]{
        _id,
        submission,
        gallery,
        name,
        email,
        parent,
        content,
        createdAt
    }`;

    const comments = await client.fetch(query, {
        id: submissionId ?? galleryId,
    });

    return NextResponse.json({ success: true, comments });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const submissionId: string | null = body.submissionId ?? null;
        const galleryId: string | null = body.galleryId ?? null;
        const name: string = body.name;
        const email: string = body.email;
        const content: string = body.comment;
        const parentId: string | null = body.parentId ?? null;

        if (!submissionId && !galleryId) {
            return NextResponse.json(
                { error: "submissionId or galleryId is required" },
                { status: 400 },
            );
        }

        if (!name || !content) {
            return NextResponse.json(
                { error: "Name and comment content are required" },
                { status: 400 },
            );
        }

        type NewComment = {
            _type: "comment";
            name: string;
            email: string | null;
            content: string;
            createdAt: string;
            submission?: { _type: "reference"; _ref: string };
            gallery?: { _type: "reference"; _ref: string };
            parent?: { _type: "reference"; _ref: string };
        };

        const newComment: NewComment = {
            _type: "comment",
            name,
            email,
            content,
            createdAt: new Date().toISOString(),
        };

        if (submissionId) {
            newComment.submission = { _type: "reference", _ref: submissionId };
        } else {
            newComment.gallery = { _type: "reference", _ref: galleryId! };
        }

        if (parentId) {
            newComment.parent = { _type: "reference", _ref: parentId };
        }

        const created = await client.create(newComment);

        return NextResponse.json({ success: true, comment: created });
    } catch (error) {
        return NextResponse.json(
            { error: `Server error: ${error}` },
            { status: 500 },
        );
    }
}
