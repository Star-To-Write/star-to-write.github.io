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
        }),

        defineField({
            name: "email",
            type: "string",
            title: "Email",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "socials",
            title: "Social Media",
            type: "array",
            of: [
                {
                    type: "object",
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
            type: "boolean",
            title: "Publish Anonymously",
            initialValue: false,
        }),
    ],
});
