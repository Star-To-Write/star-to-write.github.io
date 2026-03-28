import { type SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { commentType } from "./commentType";
import { submissionType } from "./submissionType";
import { tagType } from "./tagType";
import { magazineType } from "./magazineType";
import { galleryType } from "./galleryType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        blockContentType,
        categoryType,
        submissionType,
        authorType,
        tagType,
        commentType,
        magazineType,
        galleryType,
    ],
};
