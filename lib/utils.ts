import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// utils/comments.ts
import { type Comment, type NestedComment } from "./types";

export function buildNestedComments(comments: Comment[]): NestedComment[] {
    const map = new Map<string, NestedComment>();

    // Step 1: Initialize map and convert parent refs
    for (const c of comments) {
        map.set(c._id, {
            ...c,
            parentId: c.parent?._ref ?? null,
            children: [],
        });
    }

    const roots: NestedComment[] = [];

    // Step 2: Attach children to parents
    for (const comment of map.values()) {
        if (comment.parentId) {
            const parent = map.get(comment.parentId);
            if (parent && parent._id !== comment._id) {
                parent.children.push(comment);
            } else {
                // parent missing or circular ref — fallback to root
                roots.push(comment);
            }
        } else {
            roots.push(comment);
        }
    }

    return roots;
}
