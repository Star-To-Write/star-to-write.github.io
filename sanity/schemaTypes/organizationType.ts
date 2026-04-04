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
            options: { source: "title" },
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
            name: "subject",
            title: "Subject Area",
            type: "string",
            options: {
                list: [
                    {
                        title: "Business/Entrepreneurship",
                        value: "business_entrepreneurship",
                    },
                    { title: "Economics/Finance", value: "economics_finance" },
                    { title: "Science and STEM", value: "science_stem" },
                    {
                        title: "Public Speaking/Debate",
                        value: "public_speaking_debate",
                    },
                    {
                        title: "Environment/Sustainability",
                        value: "environment_sustainability",
                    },
                    {
                        title: "Community Service/Volunteering/Advocacy",
                        value: "community_service_volunteering_advocacy",
                    },
                    { title: "Literature", value: "literature" },
                    { title: "Psychology", value: "psychology" },
                    {
                        title: "Law/Politics/Current Affairs",
                        value: "law_politics_current_affairs",
                    },
                    {
                        title: "Journalism/Writing",
                        value: "journalism_writing",
                    },
                    {
                        title: "Graphic Design/Visual Arts",
                        value: "graphic_design_visual_arts",
                    },
                    {
                        title: "Music/Performing Arts",
                        value: "music_performing_arts",
                    },
                    {
                        title: "Content Creation/Digital Marketing",
                        value: "content_creation_digital_marketing",
                    },
                    {
                        title: "Education/Mentorship",
                        value: "education_mentorship",
                    },
                    {
                        title: "Mental Health/Well-being",
                        value: "mental_health_well_being",
                    },
                    {
                        title: "Coding/App Development",
                        value: "coding_app_development",
                    },
                    { title: "Robotics/AI", value: "robotics_ai" },
                    {
                        title: "Public Health Awareness/Medical Research",
                        value: "public_health_awareness_medical_research",
                    },
                    {
                        title: "Model United Nations (MUN)",
                        value: "model_united_nations_mun",
                    },
                    {
                        title: "Visual Art, Writing & Photography",
                        value: "visual_art_writing_photography",
                    },
                    {
                        title: "Research & Publication",
                        value: "research_publication",
                    },
                ],
            },
            validation: (Rule) => Rule.required(),
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
