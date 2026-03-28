"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageType = {
    asset: {
        url: string;
    };
};

export default function SubmissionCarousel({
    images,
}: {
    images: ImageType[];
}) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;

        images.forEach((image) => {
            const optimizedUrl =
                "/_next/image?url=" +
                encodeURIComponent(image.asset.url) +
                "&w=1920&q=75";
            const img = new window.Image();
            img.src = optimizedUrl;
        });
    }, [images]);

    if (!images || images.length === 0) return null;

    const prev = () => {
        setCurrent((current - 1 + images.length) % images.length);
    };

    const next = () => {
        setCurrent((current + 1) % images.length);
    };

    return (
        // NOTE: i think this would look better if it had like the next images on the left and right, like a cycle type stuff. this was made by brince so ill put that at a later date. ()
        <div className="relative w-full max-w-5xl mx-auto mb-3">
            {/* Main Image */}
            <div className="relative w-auto h-[400px]">
                <Image
                    src={images[current].asset.url}
                    alt="Submission image"
                    fill
                    className="object-contain"
                />
            </div>

            {/* LEFT BUTTON */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200"
            >
                <ChevronLeft
                    size={65}
                    className="text-primary"
                    strokeWidth={0.5}
                />
            </button>

            {/* RIGHT BUTTON */}
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200"
            >
                <ChevronRight
                    size={65}
                    className="text-primary"
                    strokeWidth={0.5}
                />{" "}
            </button>
            <p className="text-center italic text-gray-500">
                (Image {current + 1} of {images.length})
            </p>
        </div>
    );
}
