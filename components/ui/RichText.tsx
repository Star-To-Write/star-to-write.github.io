import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/utils";
import type { RichText } from "@/lib/types";

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
        ),
        h2: ({ children }) => (
            <h2 className="mt-8 mb-4 text-2xl font-semibold">{children}</h2>
        ),
    },

    types: {
        image: ({ value }) => (
            <figure className="my-8 max-h-xl max-w-xl">
                <img
                    src={urlFor(value).width(1200).url()}
                    alt={value.alt || ""}
                    className="rounded-xl"
                />
                {value.caption && (
                    <figcaption className="mt-2 text-sm text-gray-500">
                        {value.caption}
                    </figcaption>
                )}
            </figure>
        ),
    },
};

export function RichTextRenderer({ value }: { value: RichText }) {
    return <PortableText value={value} components={components} />;
}
