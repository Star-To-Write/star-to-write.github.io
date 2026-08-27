import { DocumentTextIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

const pdfCategoryIds = [
    "fe04b481-c857-4892-8d50-4d786e72e799", // academic writing
    "85368fa0-3589-4059-8aae-b3163c9d42b9", // short stories
] as const;

const isPdfCategory = (categoryRef?: string) =>
    pdfCategoryIds.includes(categoryRef as (typeof pdfCategoryIds)[number]);

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
            validation: (Rule) =>
                Rule.custom(async (title, context) => {
                    if (!title) return true;

                    const { document, getClient } = context;

                    if (!document?._id || !document?._type) {
                        return true;
                    }

                    const client = getClient({
                        apiVersion: "2024-01-01",
                    });

                    const id = document._id.replace(/^drafts\./, "");

                    const query = `count(*[
                _type == $type &&
                title == $title &&
                !(_id in [$id, $draftId])
            ])`;

                    const params = {
                        type: document._type,
                        title: title,
                        id,
                        draftId: `drafts.${id}`,
                    };

                    const count = await client.fetch(query, params);

                    return count === 0 ? true : "This title is already in use";
                })
                    .warning(
                        "There is a submission with the same name. Are they different? If so, proceed.",
                    )
                    .required(),
        }),

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

        // allow attach as pdf
        defineField({
            title: "PDF instead of text",
            name: "pdf",
            type: "boolean" as const,
            initialValue: false,
            hidden: ({ document }) =>
                !isPdfCategory((document?.category as { _ref?: string })?._ref),
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
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    console.log(document);

                    const categoryIsPdf = isPdfCategory(
                        (context.document?.category as { _ref?: string })?._ref,
                    );

                    if (categoryIsPdf && context.document?.pdf) return true;

                    return Array.isArray(value) && value.length > 0
                        ? true
                        : "Content is required unless PDF instead of text is enabled";
                }),
            hidden: ({ document }) =>
                isPdfCategory(
                    (document?.category as { _ref?: string })?._ref,
                ) && document?.pdf === true,
        }),

        // research articles/academic writing only
        defineField({
            name: "paperFile",
            title: "Upload PDF",
            type: "file",
            options: {
                accept: ".pdf",
            },
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    console.log(context.document);
                    const categoryIsPdf = isPdfCategory(
                        (context.document?.category as { _ref?: string })?._ref,
                    );

                    if (!categoryIsPdf || !context.document?.pdf) return true;

                    return value
                        ? true
                        : "A PDF is required when PDF instead of text is enabled";
                }),
            hidden: ({ document }) =>
                !isPdfCategory(
                    (document?.category as { _ref?: string })?._ref,
                ) || document?.pdf !== true,
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
        // submission date - removed for redundancy
        // defineField({
        //     name: "_createdAt",
        //     type: "datetime" as const,
        //     initialValue: () => new Date().toISOString(),
        // }),

        defineField({
            name: "featured",
            type: "boolean" as const,
            title: "Feature on homepage",
            initialValue: false,
            validation: (Rule) =>
                Rule.custom(async (featured, context) => {
                    if (!featured) return true;

                    const { document, getClient } = context;

                    if (!document?._id || !document?._type) {
                        return true;
                    }

                    const client = getClient({
                        apiVersion: "2024-01-01",
                    });

                    const id = document._id.replace(/^drafts\./, "");

                    const query = `*[
                _type == $type &&
                featured == $featured &&
                !(_id in [$id, $draftId])
            ]`;

                    const params = {
                        type: document._type,
                        featured: featured,
                        id,
                        draftId: `drafts.${id}`,
                    };

                    const dupe = await client.fetch(query, params);

                    return dupe.length === 0
                        ? true
                        : `The submission '${dupe[0].title} is already featured. Toggle this option off there before toggling this on!'`;
                }).error(),
        }),
    ],
});
