"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface SubmissionLikeProps {
    submissionId: string;
}

export default function SubmissionLike({ submissionId }: SubmissionLikeProps) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchState = async () => {
            try {
                const res = await fetch(`/api/like?subId=${submissionId}`);
                if (!res.ok) return;
                const json = await res.json();
                if (json.success) {
                    setLikes(json.likes ?? 0);
                    setIsLiked(json.isLiked ?? false);
                }
            } catch (err) {
                console.error("Could not fetch like state", err);
            }
        };

        fetchState();
    }, [submissionId]);

    const handleLike = async () => {
        if (isLoading) return;

        setIsLoading(true);
        const action = isLiked ? "unlike" : "like";

        try {
            const res = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subId: submissionId, action }),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                setLikes(json.likes ?? likes + (action === "like" ? 1 : -1));
                setIsLiked(json.isLiked ?? action === "like");
            } else {
                console.error("Failed to update like", json?.error);
            }
        } catch (err) {
            console.error("Like request failed", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={isLoading}
            className={`flex items-center gap-1 text-sm transition-colors ${
                isLiked
                    ? "text-red-500"
                    : "text-muted-foreground hover:text-red-500"
            }`}
            aria-label="Like submission"
        >
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
            <span>{likes}</span>
        </button>
    );
}
