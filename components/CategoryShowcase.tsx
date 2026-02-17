import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: "/get-published",
        title: "GET PUBLISHED NOW",
        description:
            "Submit your writing for free publication and reach a global audience",
        image: "https://images.unsplash.com/photo-1559312171-dd6390da4fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmclMjBwZW4lMjBwYXBlcnxlbnwxfHx8fDE3NTU3Mjc5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
        id: "/journalism",
        title: "JOURNALISM",
        description:
            "Investigative pieces, cultural commentary, and youth perspectives",
        image: "https://images.unsplash.com/photo-1579308343343-6557a756d515?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3VybmFsaXNtJTIwbmV3c3BhcGVyJTIwd3JpdGluZ3xlbnwxfHx8fDE3NTU3MjgwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
        id: "/gallery",
        title: "Gallery",
        description:
            "Visual storytelling, digital art, and creative multimedia projects",
        image: "https://images.unsplash.com/photo-1613563967994-faa3a4e08455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBkZXNpZ24lMjBjcmVhdGl2ZSUyMHN0dWRpb3xlbnwxfHx8fDE3NTU2OTIyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
