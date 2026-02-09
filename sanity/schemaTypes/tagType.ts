import { TagIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const tagType = defineType({
    name: "tag",
    title: "Tag",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
});
