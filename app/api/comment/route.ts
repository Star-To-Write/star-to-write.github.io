import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const submissionId: string = body.submissionId;
        const name: string = body.name;
        const email: string = body.email;
        const content: string = body.comment;
        const parentId: string | null = body.parentId ?? null;

        if (!submissionId) {
            return NextResponse.json(
                { error: "No submissionId provided" },
                { status: 400 },
            );
        }

        if (!name || !content) {
            return NextResponse.json(
                { error: "Name and comment content are required" },
                { status: 400 },
            );
        }

        const newComment = {
            _type: "comment",
            submission: { _type: "reference", _ref: submissionId },
            parent: parentId
                ? { _type: "reference", _ref: parentId }
                : undefined,
            name,
            email,
            content,
            createdAt: new Date().toISOString(),
        };

        const created = await client.create(newComment);

        return NextResponse.json({ success: true, comment: created });
    } catch (error) {
        return NextResponse.json(
            { error: `Server error: ${error}` },
            { status: 500 },
        );
    }
}
