// analytics stuff dont worry abt it

import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function getSessionId() {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("session_id")?.value;

    if (!sessionId) {
        sessionId = randomUUID();

        cookieStore.set("session_id", sessionId, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 365, // 1 year
        });
    }

    return sessionId;
}
