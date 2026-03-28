"use client";

// components/SubmissionComments.tsx
import { useState } from "react";
import { NestedComment } from "@/lib/types";
import LeaveAComment from "@/components/LeaveAComment";

interface SubmissionCommentsProps {
    comments: NestedComment[];
    submissionId?: string;
    galleryId?: string;
    onCommentSent?: () => void;
}

const CommentCard: React.FC<{
    comment: NestedComment;
    level?: number;
    submissionId?: string;
    galleryId?: string;
    onCommentSent?: () => void;
}> = ({ comment, level = 0, submissionId, galleryId, onCommentSent }) => {
    const [replying, setReplying] = useState(false);

    return (
        <div
            style={{ marginLeft: level * 16 }}
            className="text-md text-primary mb-1.5"
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
            <p className="ml-2 text-foreground break-words whitespace-pre-wrap">
                {comment.content ?? "[No content]"}
            </p>

            <div className="ml-2 mt-1">
                <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => setReplying(!replying)}
                >
                    {replying ? "Cancel" : "Reply"}
                </button>
            </div>

            {replying && (
                <div className="mt-1 ml-3">
                    <LeaveAComment
                        submissionId={submissionId}
                        galleryId={galleryId}
                        parentId={comment._id}
                        onCommentSent={() => {
                            setReplying(false);
                            if (onCommentSent) {
                                onCommentSent();
                            }
                        }}
                    />
                </div>
            )}

            {comment.children.length > 0 &&
                comment.children.map((child) => (
                    <CommentCard
                        key={child._id}
                        comment={child}
                        level={level + 1}
                        submissionId={submissionId}
                        galleryId={galleryId}
                        onCommentSent={onCommentSent}
                    />
                ))}
        </div>
    );
};

export default function SubmissionComments({
    comments,
    submissionId,
}: SubmissionCommentsProps) {
    if (!comments || comments.length === 0) {
        return (
            <p className="text-gray-500 text-center mb-2">
                No comments yet. How about you be a Star to Comment?
            </p>
        );
    }

    return (
        <div className="space-y-0.5 mb-2">
            {comments.map((comment) => (
                <CommentCard
                    key={comment._id}
                    comment={comment}
                    submissionId={submissionId}
                />
            ))}
        </div>
    );
}
