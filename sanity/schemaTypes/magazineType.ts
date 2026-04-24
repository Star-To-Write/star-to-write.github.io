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
            validation: (Rule) =>
                Rule.custom((title, context) => {
                    const { document } = context;
                    if (document?.status === "Published" && !title) {
                        return "Title is required for published magazines";
                    }
                    return true;
                }),
        }),

        // slug
        defineField({
            name: "slug",
            type: "slug" as const,
            options: { source: "title" },
            validation: (Rule) =>
                Rule.custom((slug, context) => {
                    const { document } = context;
                    if (document?.status === "Published" && !slug) {
                        return "Slug is required for published magazines";
                    }
                    return true;
                }),
        }),

        defineField({
            title: "Issue No.",
            name: "issue",
            type: "number" as const,
            validation: (Rule) =>
                Rule.custom(async (issue, context) => {
                    const { document } = context;

                    // If coming soon, no validation required
                    if (document?.status === "Coming Soon") {
                        return true;
                    }

                    // For published magazines, issue is required
                    if (!issue) {
                        return "Issue number is required for published magazines";
                    }

                    // Check for uniqueness
                    const { getClient } = context;
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
            validation: (Rule) =>
                Rule.custom((issueType, context) => {
                    const { document } = context;
                    if (document?.status === "Published" && !issueType) {
                        return "Issue type is required for published magazines";
                    }
                    return true;
                }),
        }),

        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image" as const,
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
            validation: (Rule) =>
                Rule.custom(async (link, context) => {
                    const { document } = context;
                    if (document?.status === "Published" && !link) {
                        return "Link is required for published magazines";
                    } else if (document?.submissionsOpen === true && !link) {
                        return "Link is required if submissions are open";
                    } else if (document) {
                        // Check for uniqueness
                        const { getClient } = context;
                        if (!document) return "Unable to get document";
                        const client = getClient({ apiVersion: "2024-01-01" });
                        const id = document._id.replace(/^drafts\./, "");
                        const query = `count(*[_type == $type && submissionsOpen == true && issueType == $issueType && !(_id in [$id, $draftId])])`;
                        const params = {
                            type: document._type,
                            issueType: document.issueType,
                            id,
                            draftId: `drafts.${id}`,
                        };
                        const count = await client.fetch(query, params);
                        return count === 0
                            ? true
                            : "There is already a magazine with submissions open! If it already has been released, are you sure you turned off 'Submissions Open'?";
                    }
                    return true;
                }),
        }),

        defineField({
            title: "Description",
            name: "description",
            type: "text" as const,
            validation: (Rule) =>
                Rule.custom((description, context) => {
                    const { document } = context;
                    if (document?.status === "Published" && !description) {
                        return "Description is required for published magazines";
                    }
                    return true;
                }),
        }),

        // tags
        defineField({
            title: "Tags",
            name: "tags",
            type: "array" as const,
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

        // submissions open flag
        defineField({
            name: "submissionsOpen",
            type: "boolean",
            title: "Submissions Open",
            description:
                "When enabled, displays a banner announcing submissions are open",
            initialValue: false,
        }),

        // defineField({
        //     name: "featured",
        //     type: "boolean" as const,
        //     title: "Feature on homepage",
        //     initialValue: false,
        // }),
    ],
});
