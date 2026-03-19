import Image from "next/image";

export function FounderCard({ founder }: any) {
    return (
        <div className="relative bg-gradient-to-br from-card/40 via-card/50 to-card/30 backdrop-blur-sm border border-border rounded-3xl p-8 lg:p-12 mb-12 overflow-hidden">
            {/* Floating celestial elements */}
            <div className="absolute top-4 left-6 w-2 h-2 bg-[#d4af37]/30 rounded-full animate-pulse" />
            <div className="absolute top-8 right-8 w-1 h-1 bg-[#d4af37]/50 rounded-full animate-ping" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                {/* Photo with spinning aura */}
                <div className="text-center lg:text-left">
                    <div className="relative inline-block">
                        <div
                            className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 via-transparent to-[#d4af37]/20 rounded-full animate-spin"
                            style={{ animationDuration: "20s" }}
                        />
                        <div
                            className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent rounded-full animate-spin"
                            style={{
                                animationDuration: "15s",
                                animationDirection: "reverse",
                            }}
                        />

                        <div className="relative w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#d4af37]/20 hover:ring-[#d4af37]/40 transition-all duration-500 hover:scale-105 group">
                            <Image
                                src={founder.image_url}
                                fill
                                alt={`${founder.name}, ${founder.role}`}
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Founder Info */}
                <div>
                    <h3
                        className="text-2xl mb-2 text-[#d4af37]"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        {founder.name}
                    </h3>

                    <div className="px-3 py-1 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/20 inline-block mb-4">
                        <span className="text-[#d4af37]/80 text-sm">
                            💖 {founder.caption}
                        </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-lg relative">
                        <span className="text-[#d4af37]/40 text-2xl absolute -left-2 -top-1">
                            "
                        </span>
                        {founder.intro}
                        <span className="text-[#d4af37]/40 text-2xl absolute -right-1 -bottom-2">
                            "
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
