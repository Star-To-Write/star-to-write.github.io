import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const secret = req.nextUrl.searchParams.get("secret");

        if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
            return NextResponse.json(
                { message: "Invalid secret" },
                { status: 401 },
            );
        }

        const body = await req.json();

        // Optional: choose tag dynamically by content type
        const tag = body._type || "submission";

        revalidateTag(tag);

        return NextResponse.json({
            revalidated: true,
            tag,
            now: Date.now(),
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Error revalidating", err },
            { status: 500 },
        );
    }
}
