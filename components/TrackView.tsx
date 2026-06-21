"use client";

import { getFingerPrint } from "@/lib/utils";
import { useEffect } from "react";

export default function TrackView({ subId }: { subId: string }) {
    useEffect(() => {
        let active = true;

        const fetchState = async () => {
            try {
                const hash = await getFingerPrint();
                if (!active) return;

                const res = await fetch("/api/view", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ subId, userHash: hash }),
                });
                if (!res.ok) return;
            } catch (err) {
                console.error("Could not fetch view state", err);
            }
        };

        fetchState();

        return () => {
            active = false;
        };
    }, [subId]);

    return null;
}
