import { getSessionId } from "@/lib/session";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
    const { subId } = await req.json();
    const sessionId = await getSessionId();

    const result = await sql`
    INSERT INTO sub_views (sub_id, session_id)
    VALUES (${subId}, ${sessionId})
    ON CONFLICT DO NOTHING
    RETURNING sub_id
  `;

    if (result.length === 1) {
        await sql`
      INSERT INTO sub_stats (sub_id, views)
      VALUES (${subId}, 1)
      ON CONFLICT (sub_id)
      DO UPDATE SET views = sub_stats.views + 1
    `;
    }

    return Response.json({ success: true });
}
