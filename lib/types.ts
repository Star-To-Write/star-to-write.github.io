import { PortableTextBlock } from "next-sanity";
import type {
    SanityAsset,
    SanityReference,
    SanityImageObject,
    SanityImageWithAssetStub,
} from "@sanity/image-url/lib/types/types";

export type Tag = {
    name: string;
};

export type Category = {
    title: string;
    slug: string;
};

export type Author = {
    name?: string;
    bio: string;
    socials: SocialMedia[];
    anonymous: boolean;
};

export type SocialMedia = {
    _key: string;
    platform: "instagram" | "twitter" | "tiktok" | "youtube" | "linkedin";
    username: string;
};

export interface SanityImage {
    alt: string;
    asset: {
        url: string;
    };
}

export type RichText = PortableTextBlock[];

export interface Submission {
    _id: string; // Sanity assigned id
    title: string;
    slug: string;
    excerpt: string;
    content: RichText;
    submittedDate: string;
    author: Author;
    images: SanityImage[];
    tags?: Tag[];
    category: Category;
    stats?: {
        likes?: number;
        views?: number;
        shares?: number;
        comments?: number;
    };
}

export interface GalleryItem {
    id: string;
    slug: string;
    title: string;
    author: Author;
    description: string;
    images: SanityImage[];
    category: string;
    likes: number;
    comments: number;
    views: number;
    featured: boolean;
    isLiked: boolean;
}

export interface SubmissionMeta {
    status: "Draft" | "Submitted" | "Published";
    featured: boolean;
}

export type Member = {
    emoji: string;
    name: string;
    role: string;
    bio: string;
};

export type Department = {
    name: string;
    description: string;
    members: Member[];
};

export type Founder = {
    image_url: string;
    name: string;
    role: string;
    caption: string;
    intro: string;
};

// NOTE: add tags later if we want to show the tags but rn no
export type FeaturedSubmission = Pick<
    Submission,
    "title" | "excerpt" | "slug" | "images" | "author" | "category" | "tags"
>;

export type LatestSubmissions = Pick<
    Submission,
    | "title"
    | "excerpt"
    | "slug"
    | "images"
    | "author"
    | "category"
    | "submittedDate"
    | "tags"
>;

export type SanityImageSource =
    | string
    | SanityReference
    | SanityAsset
    | SanityImageObject
    | SanityImageWithAssetStub;

export interface Comment {
    _id: string;
    email?: string;
    name: string;
    content: string;
    createdAt: string;
    parent?: { _ref: string; _type: "reference" } | null;
    submission?: { _ref: string; _type: "reference" };
    gallery?: { _ref: string; _type: "reference" };
}

export interface NestedComment extends Omit<Comment, "parent"> {
    parentId: string | null; // easier to work with
    children: NestedComment[];
}

type Location = {
    country: string;
    state?: string;
};

type subjectArea =
    | "Business/Entrepreneurship"
    | "Economics/Finance"
    | "Science and STEM"
    | "Public Speaking/Debate"
    | "Environment/Sustainability"
    | "Community Service/Volunteering/Advocacy"
    | "Literature"
    | "Psychology"
    | "Law/Politics/Current Affairs"
    | "Journalism/Writing"
    | "Graphic Design/Visual Arts"
    | "Music/Performing Arts"
    | "Content Creation/Digital Marketing"
    | "Education/Mentorship"
    | "Mental Health/Well-being"
    | "Coding/App Development"
    | "Robotics/AI"
    | "Public Health Awareness/Medical Research"
    | "Model United Nations (MUN)"
    | "Visual Art, Writing & Photography"
    | "Research & Publication";

export interface Organization {
    name: string;
    slug: string;
    logo: string;
    location: Location;
    subject: subjectArea;
    description: string;
    involvement?: string;
    goal?: string;
    scope: "city" | "country" | "worldwide";
    openRoles: string;
    applicationLink: string;
    socials: SocialMedia[];
}
