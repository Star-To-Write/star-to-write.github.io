import { sql } from "@/lib/db";

async function getTotalLikes(subId: string) {
    // looks for how many rows of likes of a specific UUID
    const postLikes =
        await sql`SELECT COUNT(*) FILTER (WHERE post_id=${subId}) FROM post_likes`;
    const count = postLikes[0]?.count ?? postLikes[0]?.count_ ?? 0;
    return { likes: Number(count) };
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const subId = url.searchParams.get("subId");

    if (!subId) {
        return Response.json({ error: "subId is required!", status: 400 });
    }

    // gets if the user has liked it or not
    const userHash = url.searchParams.get("userHash");

    const didUserLike = userHash
        ? await sql`
              SELECT 1 FROM post_likes
              WHERE post_id = ${subId}
                AND user_hash = ${userHash}
              LIMIT 1
          `
        : [];

    const { likes } = await getTotalLikes(subId);

    return Response.json({
        success: true,
        likes,
        isLiked: didUserLike.length > 0,
    });
}

export async function POST(req: Request) {
    const { subId, action, userHash } = await req.json();

    if (!subId) {
        return Response.json({ error: "subId is required!" });
    }

    if (!userHash) {
        return Response.json(
            { error: "userHash is required" },
            { status: 400 },
        );
    }

    // if its not a like or unlike then its invalid
    if (action !== "like" && action !== "unlike") {
        return Response.json(
            { error: "Invalid action, expected 'like' or 'unlike'" },
            { status: 400 },
        );
    }

    const didUserLike = await sql`
        SELECT 1 FROM post_likes
        WHERE post_id = ${subId}
          AND user_hash = ${userHash}
        LIMIT 1
    `;

    const userLiked = didUserLike.length > 0;

    if (action === "like" && !userLiked) {
        await sql`
            INSERT INTO post_likes (post_id, user_hash)
            VALUES (${subId}, ${userHash})
            ON CONFLICT DO NOTHING
        `;
        await sql`
            INSERT INTO post_stats (post_id, likes)
            VALUES (${subId}, 1)
            ON CONFLICT (post_id)
            DO UPDATE SET likes = post_stats.likes + 1
        `;
    } else if (action === "unlike" && userLiked) {
        await sql`
            DELETE FROM post_likes
            WHERE post_id = ${subId}
              AND user_hash = ${userHash}
        `;
        await sql`
            UPDATE post_stats
            SET likes = GREATEST(COALESCE(likes, 0) - 1, 0)
            WHERE post_id = ${subId}
        `;
    }

    const { likes } = await getTotalLikes(subId);

    return Response.json({
        success: true,
        likes,
        isLiked: action === "like",
    });
}

// async function getCurrentLikeState(subId: string) {
//     const stats =
//         await sql`SELECT likes FROM post_stats WHERE post_id = ${subId}`;
//     return { likes: stats[0]?.likes ?? 0 };
// }

// export async function GET(req: Request) {
//     const url = new URL(req.url);
//     const subId = url.searchParams.get("subId");

//     if (!subId) {
//         return Response.json({ error: "subId is required" }, { status: 400 });
//     }

//     const userHash = getuserHash();
//     const existing = await sql`
//         SELECT 1 FROM post_likes
//         WHERE post_id = ${subId}
//           AND user_hash = ${userHash}
//         LIMIT 1
//     `;

//     const { likes } = await getCurrentLikeState(subId);

//     return Response.json({
//         success: true,
//         likes,
//         isLiked: existing.length > 0,
//     });
// }

// export async function POST(req: Request) {
//     const { subId, action } = await req.json();
//     const userHash = getuserHash();

//     if (!subId) {
//         return Response.json({ error: "subId is required" }, { status: 400 });
//     }

//     if (action !== "like" && action !== "unlike") {
//         return Response.json(
//             { error: "Invalid action, expected 'like' or 'unlike'" },
//             { status: 400 },
//         );
//     }

//     const existing = await sql`
//         SELECT 1 FROM post_likes
//         WHERE post_id = ${subId}
//           AND user_hash = ${userHash}
//         LIMIT 1
//     `;

//     const alreadyLiked = existing.length > 0;

//     if (action === "like" && !alreadyLiked) {
//         await sql`
//             INSERT INTO post_likes (post_id, user_hash)
//             VALUES (${subId}, ${userHash})
//             ON CONFLICT DO NOTHING
//         `;
//         await sql`
//             INSERT INTO post_stats (post_id, likes)
//             VALUES (${subId}, 1)
//             ON CONFLICT (post_id)
//             DO UPDATE SET likes = post_stats.likes + 1
//         `;
//     } else if (action === "unlike" && alreadyLiked) {
//         await sql`
//             DELETE FROM post_likes
//             WHERE post_id = ${subId}
//               AND user_hash = ${userHash}
//         `;
//         await sql`
//             UPDATE post_stats
//             SET likes = GREATEST(COALESCE(likes, 0) - 1, 0)
//             WHERE post_id = ${subId}
//         `;
//     }

//     const { likes } = await getCurrentLikeState(subId);

//     return Response.json({
//         success: true,
//         likes,
//         isLiked:
//             action === "like"
//                 ? true
//                 : action === "unlike"
//                   ? false
//                   : alreadyLiked,
//     });
// }
