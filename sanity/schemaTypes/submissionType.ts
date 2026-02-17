import { DocumentTextIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const submissionType = defineType({
    name: "submission",
    title: "Submission",
    type: "document",
    icon: DocumentTextIcon,

    fields: [
        // title
        defineField({
            name: "title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        //     name: "coverImage",
        //     title: "Cover Image",
        //     type: "image",
        //     options: {
        //         hotspot: true, // enables smart cropping
        //     },
        //     fields: [
        //         defineField({
        //             name: "alt",
        //             title: "Alt text",
        //             type: "string",
        //             validation: (Rule) =>
        //                 Rule.required().error(
        //                     "Alt text is required for accessibility",
        //                 ),
        //         }),

        //         defineField({
        //             name: "caption",
        //             title: "Caption",
        //             type: "string",
        //         }),

        //         defineField({
        //             name: "credit",
        //             title: "Image credit",
        //             type: "string",
        //         }),
        //     ],
        // }),

        // slug
        defineField({
            name: "slug",
            type: "slug",
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),

        // author
        defineField({
            name: "author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (Rule) => Rule.required(),
        }),

        // excerpt
        defineField({
            name: "excerpt",
            type: "text",
            rows: 3,
        }),

        // category
        defineField({
            name: "category",
            type: "reference",
            to: [{ type: "category" }],
            validation: (Rule) => Rule.required(),
        }),

        // image posted on ig essentially
        defineField({
            name: "images",
            title: "Image Version",
            type: "array",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),

        // content
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Center", value: "center" },
                        { title: "Right Align", value: "right" },
                    ],
                },
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            title: "Alt text",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),

        // tags (replaces article_tags table)
        defineField({
            name: "tags",
            type: "array",
            of: [{ type: "reference", to: [{ type: "tag" }] }],
        }),

        // submission date
        defineField({
            name: "submittedDate",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),

        // editorial status
        defineField({
            name: "status",
            type: "string",
            options: {
                list: [
                    "Submitted",
                    "In Review",
                    "Accepted",
                    "Rejected",
                    "Published",
                ],
            },
            initialValue: "Submitted",
        }),

        defineField({
            name: "featured",
            type: "boolean",
            title: "Feature on homepage",
            initialValue: false,
        }),
    ],
});
