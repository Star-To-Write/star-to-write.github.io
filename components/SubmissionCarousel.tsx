"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
    const [isFullscreen, setIsFullscreen] = useState(false);

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

    const prev = () => {
        setCurrent((current) => (current - 1 + images.length) % images.length);
    };

    const next = () => {
        setCurrent((current) => (current + 1) % images.length);
    };

    const openFullscreen = () => setIsFullscreen(true);
    const closeFullscreen = () => setIsFullscreen(false);

    useEffect(() => {
        if (!isFullscreen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeFullscreen();
                return;
            }

            if (event.key === "ArrowLeft") {
                prev();
                return;
            }

            if (event.key === "ArrowRight") {
                next();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFullscreen]);

    if (!images || images.length === 0) return null;

    return (
        <>
            <div className="relative w-full max-w-5xl mx-auto mb-3">
                {/* Main Image */}
                <div
                    className="relative w-full h-full min-h-[280px] flex items-center justify-center cursor-zoom-in"
                    onClick={openFullscreen}
                >
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
                    aria-label="Previous image"
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
                    aria-label="Next image"
                >
                    <ChevronRight
                        size={65}
                        className="text-primary"
                        strokeWidth={0.5}
                    />
                </button>
                <p className="text-center italic text-gray-500">
                    (Image {current + 1} of {images.length})
                </p>
            </div>

            {isFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={closeFullscreen}
                >
                    <div
                        className="relative w-full max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            onClick={closeFullscreen}
                            className="absolute right-4 top-4 z-20 rounded-full bg-black/60 p-2 text-white shadow-lg transition hover:bg-black"
                            aria-label="Close fullscreen view"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative w-full h-[calc(100vh-6rem)] sm:h-[calc(100vh-5rem)]">
                            <Image
                                src={images[current].asset.url}
                                alt="Submission image fullscreen"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
                            aria-label="Previous image"
                        >
                            <ChevronLeft
                                size={42}
                                className="text-primary"
                                strokeWidth={0.5}
                            />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white transition hover:bg-black"
                            aria-label="Next image"
                        >
                            <ChevronRight
                                size={42}
                                className="text-primary"
                                strokeWidth={0.5}
                            />
                        </button>

                        <div className="mt-4 text-center text-sm text-white/80 sm:text-base">
                            Image {current + 1} of {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
