import { sql } from "@/lib/db";
import { getSessionId } from "@/lib/session";

async function getCurrentLikeState(subId: string) {
    const stats =
        await sql`SELECT likes FROM sub_stats WHERE sub_id = ${subId}`;
    return { likes: stats[0]?.likes ?? 0 };
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const subId = url.searchParams.get("subId");

    if (!subId) {
        return Response.json({ error: "subId is required" }, { status: 400 });
    }

    const sessionId = getSessionId();
    const existing = await sql`
        SELECT 1 FROM sub_likes
        WHERE sub_id = ${subId}
          AND session_id = ${sessionId}
        LIMIT 1
    `;

    const { likes } = await getCurrentLikeState(subId);

    return Response.json({
        success: true,
        likes,
        isLiked: existing.length > 0,
    });
}

export async function POST(req: Request) {
    const { subId, action } = await req.json();
    const sessionId = getSessionId();

    if (!subId) {
        return Response.json({ error: "subId is required" }, { status: 400 });
    }

    if (action !== "like" && action !== "unlike") {
        return Response.json(
            { error: "Invalid action, expected 'like' or 'unlike'" },
            { status: 400 },
        );
    }

    const existing = await sql`
        SELECT 1 FROM sub_likes
        WHERE sub_id = ${subId}
          AND session_id = ${sessionId}
        LIMIT 1
    `;

    const alreadyLiked = existing.length > 0;

    if (action === "like" && !alreadyLiked) {
        await sql`
            INSERT INTO sub_likes (sub_id, session_id)
            VALUES (${subId}, ${sessionId})
            ON CONFLICT DO NOTHING
        `;
        await sql`
            INSERT INTO sub_stats (sub_id, likes)
            VALUES (${subId}, 1)
            ON CONFLICT (sub_id)
            DO UPDATE SET likes = sub_stats.likes + 1
        `;
    } else if (action === "unlike" && alreadyLiked) {
        await sql`
            DELETE FROM sub_likes
            WHERE sub_id = ${subId}
              AND session_id = ${sessionId}
        `;
        await sql`
            UPDATE sub_stats
            SET likes = GREATEST(COALESCE(likes, 0) - 1, 0)
            WHERE sub_id = ${subId}
        `;
    }

    const { likes } = await getCurrentLikeState(subId);

    return Response.json({
        success: true,
        likes,
        isLiked:
            action === "like"
                ? true
                : action === "unlike"
                  ? false
                  : alreadyLiked,
    });
}
