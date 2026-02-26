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
    <div className="relative w-full max-w-5xl mx-auto">

      {/* Main Image */}
      <div className="relative w-full h-[500px]">
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
        <Image
          src="/ui/previous.png"
          alt="Previous"
          width={80}
          height={80}
        />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200"
      >
        <Image
          src="/ui/next.png"
          alt="Next"
          width={80}
          height={80}
        />
      </button>

    </div>
  )
}
