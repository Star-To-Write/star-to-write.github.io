"use client";

import { useState } from "react";
import { Button } from "./ui/Button";

export function SubscribeCard() {
    const [email, setEmail] = useState("");
    const isSubscribed = false;
    // const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
            "Mailing is currently not available, please follow our socials @startowrite and turn on notifications for updates!",
        );
        // if (email) {
        //   setIsSubscribed(true);
        //   setEmail("");
        //   setTimeout(() => setIsSubscribed(false), 3000);
        // }
    };
    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
                <div className="bg-gradient-to-r from-[#d4af37]/20 to-transparent border border-[#d4af37]/30 rounded-lg p-6 text-center backdrop-blur-sm">
                    <div
                        className="text-xs tracking-widest text-primary uppercase mb-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        LATEST UPDATES
                    </div>
                    <h2
                        className="text-3xl mb-2 text-primary"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        UNLOCKED: NEW JOURNALISTIC ARTICLES
                    </h2>
                    <p
                        className="text-muted-foreground text-sm max-w-2xl mx-auto mb-4"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Discover newly dropped journalistic pieces from our
                        talented writers.
                        <br />
                        Subscribe to get notified about fresh articles, stories,
                        and creative works.
                    </p>

                    {isSubscribed ? (
                        <div className="bg-[#d4af37]/20 border border-[#d4af37]/50 rounded-lg p-4 max-w-md mx-auto">
                            <p
                                className="text-primary"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                ✨ Thank you for subscribing! You'll receive
                                updates about our latest publications.
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubscribe}
                            className="max-w-md mx-auto"
                        >
                            <div className="flex flex-col md:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 px-4 py-2 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                    required
                                />
                                <Button
                                    type="submit"
                                    className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </form>
                    )}

                    <div
                        className="mt-4 text-xs text-muted-foreground"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        CURATED BY @STARTOWRITE
                    </div>
                </div>
            </div>
        </div>
    );
}
