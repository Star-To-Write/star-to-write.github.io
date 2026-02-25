"use client"

import { useState } from "react"
import Image from "next/image"

type ImageType = {
  asset: {
    url: string
  }
}

export default function SubmissionCarousel({
  images,
}: {
  images: ImageType[]
}) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  const prev = () => {
    setCurrent((current - 1 + images.length) % images.length)
  }

  const next = () => {
    setCurrent((current + 1) % images.length)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">

      {/* IMAGE */}
      <div className="relative w-full h-[500px]">
        <Image
          src={images[current].asset.url}
          alt="Submission image"
          fill
          className="object-contain"
        />
      </div>

      {/* LEFT FIGMA BUTTON */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2"
      >
        <Image
          src="/images/left-arrow.png"
          alt="Previous"
          width={60}
          height={60}
        />
      </button>

      {/* RIGHT FIGMA BUTTON */}
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2"
      >
        <Image
          src="/images/right-arrow.png"
          alt="Next"
          width={60}
          height={60}
        />
      </button>

    </div>
  )
}
