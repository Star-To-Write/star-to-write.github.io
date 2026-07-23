import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const bookType = defineType({
    name: "book",
    title: "Book Management",
    type: "document",
    icon: BookIcon,
    fields: [
        defineField({
            name: "title",
            title: "Book Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug" as const,
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "cover",
            title: "Book Cover",
            type: "image" as const,
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "type",
            title: "Book Type",
            type: "array" as const,
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Children's Book", value: "Children's Book" },
                    { title: "Short Novel", value: "Short Novel" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            type: "reference" as const,
            to: [{ type: "author" as const }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "synopsis",
            title: "Synopsis",
            type: "text" as const,
            rows: 3,
        }),
        defineField({
            title: "Price",
            name: "price",
            type: "number" as const,
            validation: (Rule) => Rule.required().min(0).precision(2),
        }),
        defineField({
            title: "Link",
            name: "link",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
    ],
});
