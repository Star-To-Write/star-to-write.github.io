export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || "2026-02-04";

console.log("PROJECT ID:", process.env.SANITY_STUDIO_PROJECT_ID);
console.log("DATASET:", process.env.SANITY_STUDIO_DATASET);

export const dataset = assertValue(
    process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET ||
        process.env.SANITY_STUDIO_DATASET,
    "Missing environment variable: SANITY_STUDIO_DATASET",
);

export const projectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID ||
        process.env.SANITY_STUDIO_PROJECT_ID,
    "Missing environment variable: SANITY_STUDIO_PROJECT_ID",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    console.log(typeof v);
    if (v === undefined) {
        throw new Error(errorMessage);
    }

    return v;
}
