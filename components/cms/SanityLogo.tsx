import Image from "next/image";

export function SanityLogo() {
    return (
        <div className="relative w-full h-14">
            <Image
                src="https://startowrite.sanity.studio/logo.png"
                alt="Star to Write's Logo"
                fill
                sizes="120px"
                className="object-contain"
            />
        </div>
    );
}
