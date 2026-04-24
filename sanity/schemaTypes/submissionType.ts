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
        //     type: "image" as const,
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
            type: "slug" as const,
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),

        // author
        defineField({
            name: "author",
            type: "reference" as const,
            to: [{ type: "author" as const }],
            validation: (Rule) => Rule.required(),
        }),

        // excerpt
        defineField({
            name: "excerpt",
            type: "text" as const,
            rows: 3,
        }),

        // category
        defineField({
            name: "category",
            type: "reference" as const,
            to: [{ type: "category" as const }],
            validation: (Rule) => Rule.required(),
        }),

        // image posted on ig essentially
        defineField({
            name: "images",
            title: "Image Version",
            type: "array" as const,
            of: [
                {
                    type: "image" as const,
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
            type: "array" as const,
            of: [
                {
                    type: "block" as const,
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Center", value: "center" },
                        { title: "Right Align", value: "right" },
                    ],
                },
                {
                    type: "image" as const,
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
            type: "array" as const,
            of: [
                {
                    type: "reference" as const,
                    to: [{ type: "tag" as const }],
                    options: {
                        filter: ({ document }) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const categoryRef = (document as any)?.category
                                ?._ref;

                            if (!categoryRef) {
                                return {
                                    filter: "_type == 'tag' && false",
                                };
                            }

                            return {
                                filter: "category._ref == $categoryId",
                                params: {
                                    categoryId: categoryRef,
                                },
                            };
                        },
                    },
                },
            ],
        }),
        // submission date
        defineField({
            name: "submittedDate",
            type: "datetime" as const,
            initialValue: () => new Date().toISOString(),
        }),

        defineField({
            name: "featured",
            type: "boolean" as const,
            title: "Feature on homepage",
            initialValue: false,
        }),
    ],
});
