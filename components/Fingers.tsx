"use client";

import { useEffect, useState } from "react";
import { useFingerContext } from "./ui/FingerContext";

export function FingerMe() {
    const fingerPromise = useFingerContext();
    const [fingerprint, setFingerprint] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        fingerPromise
            .then((value) => {
                if (active) {
                    setFingerprint(value);
                }
            })
            .catch((error) => {
                console.error("Fingerprint error:", error);
            });

        return () => {
            active = false;
        };
    }, [fingerPromise]);

    console.log(fingerprint);

    return (
        <div>
            {fingerprint
                ? `Fingerprint: ${fingerprint}`
                : "Loading fingerprint..."}
        </div>
    );
}
