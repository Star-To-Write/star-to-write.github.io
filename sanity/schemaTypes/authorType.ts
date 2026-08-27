import { UsersIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const authorType = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UsersIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
            title: "Name",
            validation: (Rule) =>
                Rule.custom(async (name, context) => {
                    if (!name) return true;

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
                name == $name &&
                !(_id in [$id, $draftId])
            ])`;

                    const params = {
                        type: document._type,
                        name,
                        id,
                        draftId: `drafts.${id}`,
                    };

                    const count = await client.fetch(query, params);

                    return count === 0
                        ? true
                        : "This author name is already in use";
                }).warning(
                    "There is an author with the same name. Is this a different person? If so, proceed.",
                ),
        }),

        // Removed temporarily for redundancy
        // defineField({
        //     name: "email",
        //     type: "string",
        //     title: "Email",
        //     validation: (Rule) => Rule.required(),
        // }),

        defineField({
            name: "bio",
            type: "string",
            title: "Author Bio",
        }),

        defineField({
            name: "image",
            type: "image",
            title: "Author Image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "socials",
            title: "Social Media",
            type: "array" as const,
            of: [
                {
                    type: "object" as const,
                    fields: [
                        {
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Twitter / X", value: "twitter" },
                                    { title: "Instagram", value: "instagram" },
                                    { title: "TikTok", value: "tiktok" },
                                    { title: "YouTube", value: "youtube" },
                                ],
                            },
                        },
                        {
                            name: "username",
                            title: "Username (without @)",
                            type: "string",
                        },
                    ],
                    preview: {
                        select: {
                            platform: "platform",
                            username: "username",
                        },
                        prepare({ platform, username }) {
                            return {
                                title: username,
                                subtitle: platform,
                            };
                        },
                    },
                },
            ],
        }),

        defineField({
            name: "anonymous",
            type: "boolean" as const,
            title: "Publish Anonymously",
            initialValue: false,
        }),
    ],
});
