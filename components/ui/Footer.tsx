"use client";
import { Mail, Play } from "lucide-react";
import { siInstagram } from "simple-icons";
import Link from "next/link";

// Wrapper component for simple-icons
const SimpleIcon = ({
    icon,
    size = 20,
}: {
    icon: typeof siInstagram;
    size?: number;
}) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="currentColor"
    >
        <title>{icon.title}</title>
        <path d={icon.path} />
    </svg>
);

export default function Footer() {
    const socialLinks = [
        {
            icon: siInstagram,
            href: "https://www.instagram.com/startowrite/",
            label: "Instagram",
            type: "simple" as const,
        },
        {
            icon: Play,
            href: "https://www.tiktok.com/@startowrite",
            label: "TikTok",
            type: "lucide" as const,
        },
        {
            icon: Mail,
            href: "mailto:startowrite@gmail.com",
            label: "Email",
            type: "lucide" as const,
        },
    ];

    const footerLinks = [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Contact", href: "/contact" },
        { name: "Submissions", href: "/submissions" },
        { name: "About", href: "/about" },
    ];

    return (
        <footer>
            <div className="border-border border-t py-4 text-center">
                <h1
                    className="text-xl text-primary"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Star to <span className="text-foreground">Write</span>
                </h1>
                <p
                    className="text-xs mt-1 max-w-sm mx-auto text-muted-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    A literary publication celebrating the voices of young
                    writers, artists, and journalists.
                </p>
                {/* Social Links */}
                <div className="flex items-center justify-center space-x-6 my-4">
                    {socialLinks.map((social) => {
                        return (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                                aria-label={social.label}
                            >
                                {social.type === "simple" ? (
                                    <SimpleIcon
                                        icon={social.icon as typeof siInstagram}
                                        size={20}
                                    />
                                ) : (
                                    <social.icon size={20} />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap items-center justify-center gap-6">
                    {footerLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-center w-full border-border border-t mt-5 pt-3 py-0">
                    <p
                        className="text-xs text-muted-foreground"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        © 2026 Star to Write. All rights reserved. Empowering
                        young voices since 2025.
                    </p>
                </div>
            </div>
        </footer>
    );
}
