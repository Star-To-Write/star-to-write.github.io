import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
    name: "category",
    title: "Category",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "description",
            type: "text",
        }),

        defineField({
            name: "parent",
            title: "Parent Category",
            type: "reference",
            to: [{ type: "category" }],
            description: "Leave empty if this is a main category",
            options: {
                filter: ({ document }) => {
                    // prevent selecting itself as parent
                    const doc = document as { _id?: string };

                    if (!doc?._id) return {};

                    return {
                        filter: "_id != $currentId",
                        params: {
                            currentId: doc._id,
                        },
                    };
                },
            },
        }),
    ],

    preview: {
        select: {
            title: "title",
            parentTitle: "parent.title",
        },
        prepare({ title, parentTitle }) {
            return {
                title,
                subtitle: parentTitle ? `↳ ${parentTitle}` : "Main category",
            };
        },
    },
});
