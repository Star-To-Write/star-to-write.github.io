import { CommentIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const commentType = defineType({
    name: "comment",
    title: "Comment",
    type: "document",
    icon: CommentIcon,

    fields: [
        // Submission this comment belongs to
        defineField({
            name: "submission",
            title: "Submission",
            type: "reference",
            to: [{ type: "submission" }],
            validation: (Rule) => Rule.required(),
        }),

        // Parent comment (null = top-level comment)
        defineField({
            name: "parent",
            title: "Parent Comment",
            type: "reference",
            to: [{ type: "comment" }],
        }),

        // Public display name
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required().min(2),
        }),

        // Optional email (private, not rendered)
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),

        // Comment text
        defineField({
            name: "content",
            title: "Comment",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required().min(5),
        }),

        defineField({
            name: "createdAt",
            title: "Created At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
});
