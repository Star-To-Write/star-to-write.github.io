import { sql } from "@/lib/db";
import { getSessionId } from "@/lib/session";

export async function POST(req: Request) {
    const { subId } = await req.json();
    const sessionId = getSessionId();

    const result = await sql`
    INSERT INTO sub_likes (sub_id, session_id)
    VALUES (${subId}, ${sessionId})
    ON CONFLICT DO NOTHING
    RETURNING sub_id
  `;

    if (result[0].rowCount === 1) {
        await sql`
      INSERT INTO sub_stats (sub_id, likes)
      VALUES (${subId}, 1)
      ON CONFLICT (sub_id)
      DO UPDATE SET likes = sub_stats.likes + 1
    `;
    }

    return Response.json({ success: true });
}
