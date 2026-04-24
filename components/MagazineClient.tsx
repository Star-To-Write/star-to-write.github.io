"use client";

import { useState } from "react";
import {
    Share2,
    ExternalLink,
    Star,
    BookOpen,
    Clock,
    Sparkles,
    Eye,
    Send,
} from "lucide-react";
import { DontGo } from "@/components/DontGo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import Link from "next/link";

type Magazine = {
    _id: string;
    title: string;
    slug: string;
    issue: number;
    issueType: "regular" | "mini";
    description: string;
    tags: string[];
    status: string;
    link: string;
    submissionsOpen?: boolean;
    coverImage: {
        asset: {
            url: string;
        };
        alt: string;
    };
};

type Props = {
    featuredMagazine?: Magazine;
    previousRegularIssues: Magazine[];
    miniIssues: Magazine[];
    comingSoonMagazines: Magazine[];
    submissionsOpenMagazine?: Magazine;
};

export default function MagazineClient({
    featuredMagazine,
    previousRegularIssues,
    miniIssues,
    comingSoonMagazines,
    submissionsOpenMagazine,
}: Props) {
    console.log(featuredMagazine);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    console.log(submissionsOpenMagazine);

    const handleShare = (magazine: Magazine) => {
        const issueTypeText =
            magazine.issueType === "mini" ? "Mini Issue" : "Issue";
        navigator.clipboard.writeText(
            `Check out "${magazine.title}" - ${issueTypeText} #${magazine.issue} from Star to Write Magazine! ${magazine.link}`,
        );
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleReadNow = (magazine: Magazine) => {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        window.open(magazine.link, "_blank");
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <BookOpen className="text-primary" size={32} />
                        <h1
                            className="text-5xl text-primary"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            Star to Write Magazine
                        </h1>
                    </div>
                    <p
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Thoughtful publications for meaningful conversations.
                        Each issue explores themes that matter to our
                        generation.
                    </p>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="mb-8 p-4 bg-primary opacity-20 border border-primary border-opacity-30 rounded-xl text-center animate-in slide-in-from-top-2 duration-500">
                        <div className="flex items-center justify-center gap-2">
                            <Sparkles className="text-primary" size={20} />
                            <p
                                className="text-primary font-medium"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                🎉 Opening your magazine now...
                            </p>
                        </div>
                    </div>
                )}

                {/* Submissions Open Banner */}
                {submissionsOpenMagazine && (
                    <div className="mb-12 p-6 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-2 border-primary rounded-2xl text-center animate-in slide-in-from-top-4 duration-700 shadow-lg">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Send className="text-primary" size={28} />
                                <h2 className="text-2xl font-bold text-primary font-georgia">
                                    Submissions Now Open!
                                </h2>
                            </div>
                            <p
                                className="text-lg text-muted-foreground max-w-2xl"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                We&apos;re accepting submissions for{" "}
                                <span className="font-semibold text-primary">
                                    {submissionsOpenMagazine.title}
                                </span>
                                . Share your stories, insights, and perspectives
                                with our community.
                            </p>
                            <Link
                                href={submissionsOpenMagazine.link}
                                rel="noreferrer noopener"
                                target="_blank"
                            >
                                <Button
                                    className="bg-primary text-primary-foreground hover:opacity-90 text-lg py-3 px-8 transform hover:scale-105 transition-all duration-200"
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                    }}
                                >
                                    <Send size={20} className="mr-2" />
                                    Submit Your Work
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Featured Magazine */}
                {featuredMagazine && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Star
                                className="text-primary fill-current"
                                size={24}
                            />
                            <h2
                                className="text-3xl text-primary"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Latest Issue
                            </h2>
                        </div>

                        <div className="bg-gradient-to-br from-card to-card backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-2xl opacity-95">
                            <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                                {/* Magazine Cover */}
                                <div className="relative group">
                                    <div className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                                        <Image
                                            src={
                                                featuredMagazine.coverImage
                                                    ?.asset?.url ||
                                                "/starless-sky.png"
                                            }
                                            fill
                                            alt={
                                                featuredMagazine.coverImage
                                                    ?.alt ||
                                                featuredMagazine.title
                                            }
                                            style={{ objectFit: "cover" }}
                                            className="group-hover:brightness-110 transition-all duration-500"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        {/* Issue Badge
                                        <div className="absolute top-4 left-4">
                                            <Badge
                                                className="bg-primary opacity-90 text-primary-foreground backdrop-blur-sm"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                Issue #{featuredMagazine.issue}
                                            </Badge>
                                        </div> */}
                                        {/* Free Badge */}
                                        <div className="absolute top-4 right-4">
                                            <Badge
                                                className="bg-primary opacity-90 text-white backdrop-blur-sm"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                FREE
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Magazine Details */}
                                <div className="flex flex-col justify-center">
                                    <div className="mb-6">
                                        <h3
                                            className="text-4xl mb-4 text-primary"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            {featuredMagazine.title}
                                        </h3>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {featuredMagazine.tags?.map(
                                                (tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="outline"
                                                        className="border-primary text-primary"
                                                        style={{
                                                            fontFamily:
                                                                "Inter, sans-serif",
                                                        }}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ),
                                            )}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Star
                                                    size={16}
                                                    className="fill-current text-primary"
                                                />
                                                <span
                                                    style={{
                                                        fontFamily:
                                                            "Inter, sans-serif",
                                                    }}
                                                >
                                                    {featuredMagazine.issueType ===
                                                    "mini"
                                                        ? "Mini Issue"
                                                        : "Issue"}{" "}
                                                    #{featuredMagazine.issue}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock size={16} />
                                                <span
                                                    style={{
                                                        fontFamily:
                                                            "Inter, sans-serif",
                                                    }}
                                                >
                                                    Just Released
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="prose prose-invert max-w-none mb-8">
                                            <p
                                                className="text-muted-foreground leading-relaxed text-md"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                {featuredMagazine.description}
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Button
                                                onClick={() =>
                                                    handleReadNow(
                                                        featuredMagazine,
                                                    )
                                                }
                                                className="bg-primary text-primary-foreground hover:opacity-90 flex-1 text-lg py-3 transform hover:scale-105 transition-all duration-200"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                <ExternalLink
                                                    size={20}
                                                    className="mr-2"
                                                />
                                                Read Now - Free
                                            </Button>

                                            {/* <div className="flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-border text-muted-foreground hover:text-primary hover:border-primary hover:opacity-50 transform hover:scale-110 transition-all duration-200"
                                                >
                                                    <Heart size={20} />
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-border text-muted-foreground hover:text-primary hover:border-primary hover:opacity-50 transform hover:scale-110 transition-all duration-200"
                                                >
                                                    <MessageCircle size={20} />
                                                </Button>

                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleShare(
                                                            featuredMagazine,
                                                        )
                                                    }
                                                    className="border-border text-muted-foreground hover:text-primary hover:border-primary/50 transform hover:scale-110 transition-all duration-200"
                                                >
                                                    <Share2 size={20} />
                                                </Button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Previous Issues */}
                {previousRegularIssues.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Eye className="text-primary" size={24} />
                            <h2
                                className="text-3xl text-primary"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Previous Issues
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {previousRegularIssues.map((magazine, index) => (
                                <div
                                    key={magazine._id}
                                    className="group bg-gradient-to-br from-card to-card opacity-90 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {/* Magazine Cover */}
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={
                                                magazine.coverImage?.asset
                                                    ?.url || "/starless-sky.png"
                                            }
                                            fill
                                            alt={
                                                magazine.coverImage?.alt ||
                                                magazine.title
                                            }
                                            style={{ objectFit: "cover" }}
                                            className="group-hover:scale-110 transition-transform duration-500"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Issue Badge */}
                                        <div className="absolute top-3 left-3">
                                            <Badge
                                                className="bg-primary opacity-90 text-primary-foreground backdrop-blur-sm text-xs"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                #{magazine.issue}
                                            </Badge>
                                        </div>

                                        {/* Read Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Button
                                                onClick={() =>
                                                    handleReadNow(magazine)
                                                }
                                                className="bg-primary opacity-90 text-primary-foreground hover:bg-primary hover:opacity-95 backdrop-blur-sm transform hover:scale-110 transition-all duration-200"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                <BookOpen
                                                    size={16}
                                                    className="mr-2"
                                                />
                                                Read Now
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Magazine Info */}
                                    <div className="p-6">
                                        <h4
                                            className="text-xl mb-2 text-primary group-hover:text-primary group-hover:opacity-80 transition-colors"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            {magazine.title}
                                        </h4>

                                        <p
                                            className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {magazine.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {magazine.tags
                                                ?.slice(0, 2)
                                                .map((tag, tagIndex) => (
                                                    <Badge
                                                        key={tagIndex}
                                                        variant="secondary"
                                                        className="text-xs border-primary text-primary"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    handleShare(magazine)
                                                }
                                                className="text-muted-foreground hover:text-primary p-0 h-auto"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                <Share2
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Share
                                            </Button>

                                            <Button
                                                onClick={() =>
                                                    handleReadNow(magazine)
                                                }
                                                size="sm"
                                                className="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                <ExternalLink
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Read Free
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mini Issues */}
                {miniIssues.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles className="text-primary" size={24} />
                            <h2
                                className="text-3xl text-primary"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Mini Issues
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {miniIssues.map((magazine) => (
                                <div
                                    key={magazine._id}
                                    className="group bg-gradient-to-br from-card to-card opacity-95 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 transform hover:scale-105"
                                >
                                    {/* Mini Issue Cover */}
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={
                                                magazine.coverImage?.asset
                                                    ?.url || "/starless-sky.png"
                                            }
                                            fill
                                            alt={
                                                magazine.coverImage?.alt ||
                                                magazine.title
                                            }
                                            style={{ objectFit: "cover" }}
                                            className="group-hover:brightness-110 transition-all duration-300"
                                        />
                                        {/* Mini Badge */}
                                        <div className="absolute top-2 right-2">
                                            <Badge
                                                className="bg-primary opacity-90 text-primary-foreground text-xs backdrop-blur-sm"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                MINI
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Mini Issue Details */}
                                    <div className="p-4">
                                        <div className="mb-2">
                                            <h4
                                                className="text-lg font-semibold text-primary line-clamp-2 mb-1"
                                                style={{
                                                    fontFamily:
                                                        "Georgia, serif",
                                                }}
                                            >
                                                {magazine.title}
                                            </h4>
                                            <p
                                                className="text-sm text-muted-foreground"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                {magazine.issueType === "mini"
                                                    ? "Mini Issue"
                                                    : "Issue"}{" "}
                                                #{magazine.issue}
                                            </p>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {magazine.tags
                                                ?.slice(0, 2)
                                                .map((tag, tagIndex) => (
                                                    <Badge
                                                        key={tagIndex}
                                                        variant="outline"
                                                        className="text-xs border-primary text-primary"
                                                        style={{
                                                            fontFamily:
                                                                "Inter, sans-serif",
                                                        }}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                        </div>

                                        {/* Read Button */}
                                        <Button
                                            onClick={() =>
                                                handleReadNow(magazine)
                                            }
                                            size="sm"
                                            className="w-full bg-primary text-primary-foreground hover:opacity-90 text-sm"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            <ExternalLink
                                                size={14}
                                                className="mr-1"
                                            />
                                            Read Free
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Coming Soon */}
                {comingSoonMagazines.length > 0 && (
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <Clock className="text-primary" size={24} />
                            <h3
                                className="text-2xl text-primary"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Coming Soon
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {comingSoonMagazines.map((magazine, index) => (
                                <div
                                    key={magazine._id}
                                    className="bg-card backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:border-primary hover:opacity-90 transition-all duration-300"
                                    style={{
                                        animationDelay: `${index * 150}ms`,
                                    }}
                                >
                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpen
                                            className="text-primary-foreground"
                                            size={24}
                                        />
                                    </div>

                                    <h4
                                        className="text-lg mb-2 text-primary"
                                        style={{ fontFamily: "Georgia, serif" }}
                                    >
                                        {magazine.issueType === "mini"
                                            ? "Mini Issue"
                                            : "Issue"}{" "}
                                        #{magazine.issue}
                                    </h4>

                                    <p
                                        className="text-muted-foreground text-sm mb-4"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {magazine.title}
                                    </p>

                                    <Badge
                                        variant="outline"
                                        className="border-primary text-primary"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        Coming Soon
                                    </Badge>
                                </div>
                            ))}
                        </div>

                        <p
                            className="text-muted-foreground mt-8 max-w-2xl mx-auto"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            We're working on amazing new issues covering
                            different themes and topics. Stay tuned for upcoming
                            releases that will continue to give voice to
                            important conversations.
                        </p>
                    </div>
                )}

                {/* Newsletter */}
                <div className="mt-16 text-center">
                    <DontGo />
                </div>
            </div>
        </>
    );
}
