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
            name: "anonymous",
            type: "boolean",
            title: "Publish Anonymously",
            initialValue: false,
        }),
    ],
});
