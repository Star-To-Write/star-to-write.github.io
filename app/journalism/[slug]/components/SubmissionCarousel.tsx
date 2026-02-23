"use client";

import { useState } from "react";
import Image from "next/image";

export default function SubmissionCarousel({ images }: any) {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const next = () => {
    setCurrent((prev: number) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev: number) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="relative max-w-4xl mx-auto mt-10">

        {/* Image */}
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img: any, index: number) => (
              <div
                key={index}
                className="min-w-full cursor-pointer"
                onClick={() => setExpanded(img.asset.url)}
              >
                <Image
                  src={img.asset.url}
                  alt=""
                  width={1200}
                  height={800}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
        >
          Prev
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded"
        >
          Next
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-4">
          {images.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                index === current ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Expand Modal */}
      {expanded && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setExpanded(null)}
        >
          <img
            src={expanded}
            className="max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}
    </>
  );
}
