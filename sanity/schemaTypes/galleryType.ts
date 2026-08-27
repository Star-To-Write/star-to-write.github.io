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
                }).warning(
                    "There is a submission with the same name. Are they different? If so, proceed.",
                ),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug" as const,
            options: { source: "title" },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference" as const,
            to: [{ type: "author" as const }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text" as const,
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
            type: "array" as const,
            of: [
                {
                    type: "image" as const,
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
            type: "boolean" as const,
            initialValue: false,
        }),
    ],
});
