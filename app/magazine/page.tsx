"use client";

import { useState } from "react";
import {
    ShoppingCart,
    Heart,
    MessageCircle,
    Share2,
    ExternalLink,
    Users,
    Star,
} from "lucide-react";
import { DontGo } from "@/components/DontGo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface MagazinePageProps {
    readers: number;
    //   onIncrementReaders: () => void;
}

// reget later

export default function MagazinePage({
    readers,
}: //   onIncrementReaders,
MagazinePageProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    setComments(67); //BUG: i just need eslint to shut up :))

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(
            "Check out 'Starless Sky' - a mental health magazine by Star to Write!",
        );
    };

    const handleBuyNow = () => {
        console.log("Poop");
        // onIncrementReaders();
        setShowSuccessMessage(false);
        window.open("https://heyzine.com/flip-book/db4073e332.html", "_blank");
    };

    const highlights = [
        "Beautifully designed literary magazine",
        "Informational",
        "Mental health related",
    ];

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                {/* Header with Cart */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1
                            className="text-4xl mb-4 text-primary"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            Star to Write Magazine
                        </h1>
                        <p
                            className="text-muted-foreground"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Thoughtful publications for meaningful conversations
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="relative border-[#d4af37]/50 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                        <ShoppingCart size={20} />
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            1
                        </span>
                    </Button>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="mb-6 p-4 bg-[#d4af37]/20 border border-[#d4af37]/50 rounded-xl text-center">
                        <p
                            className="text-primary"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            🎉 Thank you for your interest! Opening Starless Sky
                            now...
                        </p>
                    </div>
                )}

                {/* Featured Magazine */}
                <div className="bg-card/40 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-8 p-8">
                        {/* Magazine Cover */}
                        <div className="relative">
                            <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={"/starless-sky.png"}
                                    alt="Starless Sky Magazine Cover - Issue 1, May 2025, In honor of Mental Health Awareness Month"
                                    className="w-full h-full object-cover"
                                />

                                {/* Free Badge */}
                                <div className="absolute top-4 right-4">
                                    <Badge
                                        className="bg-primary text-primary-foreground"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
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
                                    className="text-3xl mb-4 text-primary"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    Starless Sky
                                </h3>

                                {/* Highlights */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {highlights.map((highlight, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="border-[#d4af37]/50 text-primary"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {highlight}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users size={16} />
                                        <span
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {readers} readers
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Star
                                            size={16}
                                            className="fill-current text-primary"
                                        />
                                        <span
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            First Edition
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="prose prose-invert max-w-none mb-6">
                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        After seeing that many of our
                                        submissions carried darker, more
                                        emotional themes, we wanted our writers
                                        to know they are not alone. That's when
                                        we decided to dedicate an entire issue
                                        to mental health which was how Starless
                                        Sky was born.
                                    </p>
                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        Starless Sky is our first-ever magazine,
                                        created to be a safe place for readers
                                        to turn to whenever they feel lost,
                                        overwhelmed, or alone. Within its pages,
                                        you'll find writing that comforts,
                                        connects, and reminds you that it's okay
                                        to not be okay and that things can get
                                        better.
                                    </p>
                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        Led by Julia Philip, founder of Star to
                                        Write, and brought to life with the help
                                        of our incredible team, Starless Sky is
                                        a digital mental health magazine made
                                        for you, and for anyone who needs a
                                        reminder that they matter.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <Button
                                        onClick={handleBuyNow}
                                        className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90 flex-1"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        <ExternalLink
                                            size={16}
                                            className="mr-2"
                                        />
                                        Read Now - Free
                                    </Button>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleLike}
                                            className={`border-border ${
                                                isLiked
                                                    ? "text-red-500 border-red-500"
                                                    : "text-muted-foreground hover:text-red-500"
                                            }`}
                                        >
                                            <Heart
                                                size={16}
                                                className={
                                                    isLiked
                                                        ? "fill-current"
                                                        : ""
                                                }
                                            />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="border-border text-muted-foreground hover:text-primary"
                                        >
                                            <MessageCircle size={16} />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleShare}
                                            className="border-border text-muted-foreground hover:text-primary"
                                        >
                                            <Share2 size={16} />
                                        </Button>
                                    </div>
                                </div>

                                {/* Social Stats */}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {likes} likes
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {comments} comments
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {readers} readers
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coming Soon Section */}
                <div className="mt-16 text-center">
                    <h3
                        className="text-2xl mb-4 text-primary"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        More Issues Coming Soon
                    </h3>
                    <p
                        className="text-muted-foreground max-w-2xl mx-auto"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        We're working on more magazines covering different
                        themes and topics. Stay tuned for upcoming releases that
                        will continue to give voice to important conversations.
                    </p>
                </div>
            </div>

            <DontGo />
        </>
    );
}
