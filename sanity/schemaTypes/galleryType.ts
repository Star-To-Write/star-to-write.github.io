import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const galleryType = defineType({
    name: "gallery",
    title: "Gallery Item",
    type: "document",
    icon: ImagesIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    {
                        title: "Art and/or Photography",
                        value: "Art and/or Photography",
                    },
                    { title: "Digital Art", value: "Digital Art" },
                    { title: "Painting", value: "Painting" },
                    { title: "Illustration", value: "Illustration" },
                    { title: "Abstract", value: "Abstract" },
                    { title: "Photography", value: "Photography" },
                    { title: "Sculpture", value: "Sculpture" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt text",
                            type: "string",
                            // validation: (Rule) =>
                            //     Rule.required().error(
                            //         "Alt text is required for accessibility",
                            //     ),
                        }),
                    ],
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "featured",
            title: "Featured",
            type: "boolean",
            initialValue: false,
        }),
    ],
});
