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
    anonymous: boolean;
};

export interface SanityImage {
    alt: string;
    asset: {
        url: string;
    };
}

export type RichText = PortableTextBlock[];

export interface Submission {
    title: string;
    slug: string;
    excerpt: string;
    content: RichText;
    submittedDate: string;

    author: Author;
    images: SanityImage[];
    tags?: Tag[];
    category: Category;
}

export interface SubmissionMeta {
    status: "Draft" | "Submitted" | "Published";
    featured: boolean;
}

// NOTE: add tags later if we want to show the tags but rn no
export type FeaturedSubmission = Pick<
    Submission,
    "title" | "excerpt" | "slug" | "images" | "author" | "category"
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
>;

export type SanityImageSource =
    | string
    | SanityReference
    | SanityAsset
    | SanityImageObject
    | SanityImageWithAssetStub;
