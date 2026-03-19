// components/SubmissionComments.tsx
import React from "react";
import { NestedComment } from "@/lib/types";

interface SubmissionCommentsProps {
    comments: NestedComment[];
}

const CommentCard: React.FC<{ comment: NestedComment; level?: number }> = ({
    comment,
    level = 0,
}) => {
    return (
        <div
            style={{ marginLeft: level * 20 }}
            className="pl-12 text-md text-primary mb-2"
        >
            <div className="">
                <span className="font-semibold font-inter">{comment.name}</span>
                <span className="text-xs text-gray-500">
                    {" "}
                    at{" "}
                    {new Date(comment.createdAt).toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </span>
            </div>
            <p className="ml-2">{comment.content ?? "[No content]"}</p>

            {comment.children.length > 0 &&
                comment.children.map((child) => (
                    <CommentCard
                        key={child._id}
                        comment={child}
                        level={level + 1}
                    />
                ))}
        </div>
    );
};

export default function SubmissionComments({
    comments,
}: SubmissionCommentsProps) {
    if (!comments || comments.length === 0) {
        return <p className="text-gray-500">No comments yet.</p>;
    }

    return (
        <div className="space-y-2">
            {comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
            ))}
        </div>
    );
}
