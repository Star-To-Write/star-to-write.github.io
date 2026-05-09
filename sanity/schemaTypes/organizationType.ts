import SelectCountry from "../../components/cms/SelectCountry";
import SelectCity from "../../components/cms/SelectCity";
import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const organizationType = defineType({
    name: "organization",
    title: "Organization/Initiative",
    type: "document",
    icon: RocketIcon,
    fields: [
        defineField({
            name: "name",
            title: "Organization Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug" as const,
            options: { source: "name" },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "logo",
            title: "Organization Logo",
            type: "image" as const,
            options: {
                hotspot: true, // enables smart cropping
            },
        }),
        defineField({
            name: "location",
            title: "Based In",
            type: "string",
            components: {
                input: SelectCountry,
            },

            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "state",
            title: "State / City",
            type: "string",
            components: {
                input: SelectCity,
            },
            hidden: ({ document }) => !document?.location, // 👈 hide until country selected
        }),
        defineField({
            name: "subjects",
            title: "Subject Areas",
            type: "array" as const,
            of: [
                {
                    type: "string",
                    options: {
                        list: [
                            {
                                title: "Business/Entrepreneurship",
                                value: "Business/Entrepreneurship",
                            },
                            {
                                title: "Economics/Finance",
                                value: "Economics/Finance",
                            },
                            {
                                title: "Science and STEM",
                                value: "Science and STEM",
                            },
                            {
                                title: "Public Speaking/Debate",
                                value: "Public Speaking/Debate",
                            },
                            {
                                title: "Environment/Sustainability",
                                value: "Environment/Sustainability",
                            },
                            {
                                title: "Community Service/Volunteering/Advocacy",
                                value: "Community Service/Volunteering/Advocacy",
                            },
                            { title: "Literature", value: "Literature" },
                            { title: "Psychology", value: "Psychology" },
                            {
                                title: "Law/Politics/Current Affairs",
                                value: "Law/Politics/Current Affairs",
                            },
                            {
                                title: "Journalism/Writing",
                                value: "Journalism/Writing",
                            },
                            {
                                title: "Graphic Design/Visual Arts",
                                value: "Graphic Design/Visual Arts",
                            },
                            {
                                title: "Music/Performing Arts",
                                value: "Music/Performing Arts",
                            },
                            {
                                title: "Content Creation/Digital Marketing",
                                value: "Content Creation/Digital Marketing",
                            },
                            {
                                title: "Education/Mentorship",
                                value: "Education/Mentorship",
                            },
                            {
                                title: "Mental Health/Well-being",
                                value: "Mental Health/Well-being",
                            },
                            {
                                title: "Coding/App Development",
                                value: "Coding/App Development",
                            },
                            { title: "Robotics/AI", value: "Robotics/AI" },
                            {
                                title: "Public Health Awareness/Medical Research",
                                value: "Public Health Awareness/Medical Research",
                            },
                            {
                                title: "Model United Nations (MUN)",
                                value: "Model United Nations (MUN)",
                            },
                            {
                                title: "Visual Art, Writing & Photography",
                                value: "Visual Art, Writing & Photography",
                            },
                            {
                                title: "Research & Publication",
                                value: "Research & Publication",
                            },
                        ],
                    },
                },
            ],
            validation: (Rule) =>
                Rule.required()
                    .min(1)
                    .max(3)
                    .error("Select at least 1 and up to 3 subject areas"),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text" as const,
            rows: 3,
        }),
        defineField({
            name: "involvement",
            title: "How can students become involved/reach out to your organization? (response)",
            type: "string",
        }),
        defineField({
            name: "goal",
            title: "What impact does your organization aim to create? (response)",
            type: "string",
        }),
        defineField({
            name: "scope",
            title: "Scope of recruitment",
            type: "string",
            options: {
                list: [
                    { title: "Looking to expand in your city", value: "city" },
                    {
                        title: "Looking to expand in your country",
                        value: "country",
                    },
                    {
                        title: "Looking to expand in any part of the world",
                        value: "worldwide",
                    },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "roles",
            title: "Open Roles",
            type: "text" as const,
            rows: 5,
        }),
        defineField({
            name: "link",
            title: "Application Form/Link",
            type: "string",
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
                                    // { title: "Twitter / X", value: "twitter" },
                                    { title: "Instagram", value: "instagram" },
                                    { title: "TikTok", value: "tiktok" },
                                    { title: "LinkedIn", value: "linkedin" },
                                    { title: "YouTube", value: "youtube" },
                                    { title: "Website", value: "website" },
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
        // defineField({
        //     name: "images",
        //     title: "Images",
        //     type: "array" as const,
        //     of: [
        //         {
        //             type: "image" as const,
        //             options: {
        //                 hotspot: true,
        //             },
        //             fields: [
        //                 defineField({
        //                     name: "alt",
        //                     title: "Alt text",
        //                     type: "string",
        //                     // validation: (Rule) =>
        //                     //     Rule.required().error(
        //                     //         "Alt text is required for accessibility",
        //                     //     ),
        //                 }),
        //             ],
        //         },
        //     ],
        //     validation: (Rule) => Rule.required().min(1),
        // }),
        // defineField({
        //     name: "featured",
        //     title: "Featured",
        //     type: "boolean" as const,
        //     initialValue: false,
        // }),
    ],
});
