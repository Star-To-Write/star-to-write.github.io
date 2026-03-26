import { BookIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const magazineType = defineType({
    name: "magazine",
    title: "Magazine",
    type: "document",
    icon: BookIcon,

    fields: [
        // title
        defineField({
            name: "title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        // slug
        defineField({
            name: "slug",
            type: "slug",
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            title: "Issue No.",
            name: "issue",
            type: "number",
            validation: (Rule) =>
                Rule.required()
                    .min(1)
                    .integer()
                    .custom(async (issue, context) => {
                        if (!issue) return true; // Allow empty values (use .required() separately if needed)

                        const { document, getClient } = context;

                        if (!document) return "Unable to get document";
                        const client = getClient({ apiVersion: "2024-01-01" });
                        const id = document._id.replace(/^drafts\./, "");

                        const query = `count(*[_type == $type && issue == $issue && issueType == $issueType && !(_id in [$id, $draftId])])`;
                        const params = {
                            type: document._type,
                            issue,
                            issueType: document.issueType,
                            id,
                            draftId: `drafts.${id}`,
                        };

                        const count = await client.fetch(query, params);

                        return count === 0
                            ? true
                            : "This issue number already exists!";
                    }),
        }),

        defineField({
            name: "issueType",
            title: "Issue Type",
            type: "string",
            options: {
                list: [
                    { title: "Regular Issue", value: "regular" },
                    { title: "Mini Issue", value: "mini" },
                ],
            },
            initialValue: "regular",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: {
                hotspot: true, // enables smart cropping
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt text",
                    type: "string",
                    validation: (Rule) =>
                        Rule.required().error(
                            "Alt text is required for accessibility",
                        ),
                }),
            ],
        }),

        // link on substack or heyzine or whatever
        defineField({
            name: "link",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            title: "Description",
            name: "description",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),

        // tags
        defineField({
            title: "Tags",
            name: "tags",
            type: "array",
            of: [{ type: "string" }],
        }),

        // editorial status
        defineField({
            name: "status",
            type: "string",
            options: {
                list: ["Coming Soon", "Published"],
            },
            initialValue: "Coming Soon",
        }),

        // defineField({
        //     name: "featured",
        //     type: "boolean",
        //     title: "Feature on homepage",
        //     initialValue: false,
        // }),
    ],
});
