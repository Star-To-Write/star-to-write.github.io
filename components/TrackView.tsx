"use client";

import { useEffect } from "react";

export default function TrackView({ subId }: { subId: string }) {
    useEffect(() => {
        fetch("/api/view", {
            method: "POST",
            body: JSON.stringify({ subId }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }, [subId]);

    return null;
}
