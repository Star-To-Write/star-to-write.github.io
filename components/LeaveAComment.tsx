"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

interface LeaveACommentProps {
    submissionId: string;
    parentId?: string;
    onCommentSent?: () => void;
}

export default function LeaveAComment({
    submissionId,
    parentId,
    onCommentSent,
}: LeaveACommentProps) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [isCommentSent, setIsCommentSent] = useState(false);

    // add some parent stuff

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!submissionId) {
            console.error("No submissionId to attach comment");
            return;
        }

        if (name.trim() && comment.trim()) {
            try {
                const res = await fetch("/api/comment", {
                    method: "POST",
                    body: JSON.stringify({
                        submissionId,
                        parentId,
                        name: name.trim(),
                        email: email.trim() || null,
                        comment: comment.trim(),
                    }),
                    headers: { "Content-Type": "application/json" },
                });

                const json = await res.json();

                if (!res.ok || json?.error) {
                    console.error("Add comment failed", json?.error);
                    return;
                }

                setIsCommentSent(true);
                setName("");
                setEmail("");
                setComment("");

                if (onCommentSent) {
                    onCommentSent();
                }

                // refresh comments on page
                router.refresh();
            } catch (err) {
                console.error("Server error:", err);
            }
        }
    };

    return (
        <div className="">
            {isCommentSent ? (
                <div className="bg-[#d4af37]/20 border border-[#d4af37]/50 rounded-md p-2 max-w-full mx-auto">
                    <p
                        className="text-primary text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        ✨ Thanks! Comment posted.
                    </p>
                </div>
            ) : (
                <form
                    onSubmit={handleComment}
                    className="space-y-1.5 max-w-full mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="flex-1 px-3 py-1.5 bg-input-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 text-sm"
                            style={{ fontFamily: "Inter, sans-serif" }}
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email (optional)"
                            className="flex-1 px-3 py-1.5 bg-input-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 text-sm"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        />
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                        className="w-full px-3 py-1.5 bg-input-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        required
                    />
                    <div className="text-right">
                        <Button
                            type="submit"
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90 px-3 py-1"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Post
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
