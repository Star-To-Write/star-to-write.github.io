import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/utils";
import type { RichText } from "@/lib/types";
import Image from "next/image";

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
        ),
        right: ({ children }) => <p className="mb-4 text-right">{children}</p>,
    },

    types: {
        image: ({ value }) => {
            return (
                <figure className={`my-10 max-w-2xl mx-auto`}>
                    <Image
                        src={urlFor(value).width(1600).url()}
                        alt={value.alt}
                        width={1600}
                        height={1600}
                        className="w-full h-auto rounded-xl object-contain"
                    />

                    {value.caption && (
                        <figcaption className="mt-3 text-sm text-gray-500 text-center">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },

    list: {
        bullet: ({ children }) => (
            <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
        ),
    },
};

export function RichTextRenderer({ value }: { value: RichText }) {
    return (
        <div className="max-w-3xl mx-auto">
            <PortableText value={value} components={components} />
        </div>
    );
}
