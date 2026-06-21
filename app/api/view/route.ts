import { sql } from "@/lib/db";

export async function POST(req: Request) {
    const { subId, userHash } = await req.json();

    const result = await sql`
    INSERT INTO post_views (post_id, user_hash)
    VALUES (${subId}, ${userHash})
    ON CONFLICT DO NOTHING
    RETURNING post_id
  `;

    if (result.length === 1) {
        await sql`
      INSERT INTO post_stats (post_id, views)
      VALUES (${subId}, 1)
      ON CONFLICT (post_id)
      DO UPDATE SET views = post_stats.views + 1
    `;
    }

    return Response.json({ success: true });
}
