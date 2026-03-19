import { type Tag } from "@/lib/types";
import { TagIcon } from "lucide-react";

// NOTE: make this clickable in the future
export default function Tags({
    tags,
    className,
}: {
    tags: Tag[];
    className?: string;
}) {
    return (
        <div className={`${className} flex gap-1` || "flex gap-1"}>
            {tags.map((tag) => (
                <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-[#d4af37]/30 text-primary border border-primary/30 font-georgia`}
                    key={tag.name}
                >
                    <TagIcon size={15} className="mr-1" />
                    {tag.name}
                </div>
            ))}
        </div>
    );
}
