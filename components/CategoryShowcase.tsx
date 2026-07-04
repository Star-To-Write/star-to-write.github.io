import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: "/get-published",
        title: "GET PUBLISHED NOW",
        description:
            "Submit your writing for free publication and reach a global audience",
        image: "/getpublished-banner.png",
    },
    {
        id: "/journalism",
        title: "JOURNALISM",
        description:
            "Investigative pieces, cultural commentary, and youth perspectives",
        image: "/journalism-banner.png",
    },
    {
        id: "/gallery",
        title: "GALLERY",
        description:
            "Visual storytelling, digital art, and creative multimedia projects",
        image: "/gallery-banner.png",
    },
];

export function CategoryShowcase() {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <div className="grid md:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <Link
                        href={category.id}
                        key={category.title}
                        className="group cursor-pointer relative overflow-hidden rounded-xl bg-card/30 backdrop-blur-sm border border-border transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-card/50"
                    >
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="w-full h-full object-contain bg-[#0b132b] transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/80 via-[#0b132b]/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3
                                    className="text-lg mb-2 text-primary tracking-wide"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {category.title}
                                </h3>
                                <p
                                    className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    {category.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
