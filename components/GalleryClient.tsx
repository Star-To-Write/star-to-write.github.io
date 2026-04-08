"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Eye, X, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import SubmissionCarousel from "@/components/SubmissionCarousel";
import SubmissionComments from "@/components/submission/SubmissionComments";
import LeaveAComment from "@/components/LeaveAComment";
import { DontGo } from "@/components/DontGo";
import { buildNestedComments } from "@/lib/utils";
import type { Comment, GalleryItem } from "@/lib/types";

const categories = [
    { id: "all", name: "All Artwork" },
    { id: "art-photography", name: "Art and/or Photography" },
    { id: "digital-art", name: "Digital Art" },
    { id: "painting", name: "Painting" },
    { id: "illustration", name: "Illustration" },
    { id: "abstract", name: "Abstract" },
    { id: "photography", name: "Photography" },
    { id: "sculpture", name: "Sculpture" },
];

export default function GalleryClient({
    galleryItems,
}: {
    galleryItems: GalleryItem[];
}) {
    const [pieces, setPieces] = useState<GalleryItem[]>(galleryItems);
    const [selectedPiece, setSelectedPiece] = useState<GalleryItem | null>(
        null,
    );
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsError, setCommentsError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPiece) {
                if (
                    (e.metaKey &&
                        e.shiftKey &&
                        (e.key === "3" || e.key === "4" || e.key === "5")) ||
                    e.key === "PrintScreen" ||
                    (e.altKey && e.key === "PrintScreen") ||
                    (e.ctrlKey && e.shiftKey && e.key === "S")
                ) {
                    e.preventDefault();
                    e.stopPropagation();
                    alert(
                        "Screenshots are disabled to protect the artist's work. Please respect intellectual property rights.",
                    );
                }
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            if (selectedPiece) {
                e.preventDefault();
                alert("Right-click is disabled to protect the artist's work.");
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [selectedPiece]);

    useEffect(() => {
        if (!selectedPiece && !isCommentsModalOpen) {
            document.body.style.overflow = "";
            return;
        }

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [selectedPiece, isCommentsModalOpen]);

    const handleLike = async (pieceId: string) => {
        const currentPiece = pieces.find((piece) => piece.id === pieceId);
        if (!currentPiece) return;

        const action = currentPiece.isLiked ? "unlike" : "like";

        try {
            const res = await fetch("/api/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subId: pieceId, action }),
            });
            const json = await res.json();

            if (!res.ok || !json.success) {
                console.error("Failed to update like", json?.error);
                return;
            }

            setPieces((prev) =>
                prev.map((piece) =>
                    piece.id === pieceId
                        ? {
                              ...piece,
                              isLiked: json.isLiked ?? !piece.isLiked,
                              likes: json.likes ?? piece.likes,
                          }
                        : piece,
                ),
            );

            setSelectedPiece((prev) =>
                prev && prev.id === pieceId
                    ? {
                          ...prev,
                          isLiked: json.isLiked ?? !prev.isLiked,
                          likes: json.likes ?? prev.likes,
                      }
                    : prev,
            );
        } catch (error) {
            console.error("Like request failed", error);
        }
    };

    const handleView = async (piece: GalleryItem) => {
        const updatedPiece = { ...piece, views: piece.views + 1 };

        setPieces((prev) =>
            prev.map((p) => (p.id === piece.id ? updatedPiece : p)),
        );
        setSelectedPiece(updatedPiece);

        try {
            await fetch("/api/view", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subId: piece.id }),
            });
        } catch (error) {
            console.error("View request failed", error);
        }
    };

    const handleShare = (piece: GalleryItem) => {
        const authorName = piece.author.anonymous
            ? "Anonymous"
            : piece.author.name || "Unknown artist";

        navigator.clipboard.writeText(
            `Check out "${piece.title}" by ${authorName} on Star to Write Art & Design!`,
        );
        alert("Link copied to clipboard!");
    };

    const loadComments = useCallback(async () => {
        if (!selectedPiece) {
            setComments([]);
            setCommentsError(null);
            return;
        }

        setCommentsError(null);

        try {
            const res = await fetch(
                `/api/comment?galleryId=${selectedPiece.id}`,
            );
            const json = await res.json();

            if (!res.ok || !json.success) {
                setCommentsError(json?.error || "Failed to load comments.");
                return;
            }

            setComments(json.comments ?? []);
            setPieces((prev) =>
                prev.map((piece) =>
                    piece.id === selectedPiece.id
                        ? {
                              ...piece,
                              comments: json.comments?.length ?? piece.comments,
                          }
                        : piece,
                ),
            );
        } catch (error) {
            setCommentsError("Unable to load comments.");
            console.error("Comment fetch failed", error);
        }
    }, [selectedPiece]);

    useEffect(() => {
        loadComments();
    }, [selectedPiece, loadComments]);

    const filteredPieces = pieces.filter((piece) => {
        const authorName = piece.author.anonymous
            ? "anonymous"
            : piece.author.name?.toLowerCase() || "";

        const matchesSearch =
            piece.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            authorName.includes(searchQuery.toLowerCase()) ||
            piece.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            piece.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" ||
            (selectedCategory === "art-photography" &&
                piece.category === "Art and/or Photography") ||
            (selectedCategory === "digital-art" &&
                piece.category === "Digital Art") ||
            (selectedCategory === "painting" &&
                piece.category === "Painting") ||
            (selectedCategory === "illustration" &&
                piece.category === "Illustration") ||
            (selectedCategory === "abstract" &&
                piece.category === "Abstract") ||
            (selectedCategory === "photography" &&
                piece.category === "Photography") ||
            (selectedCategory === "sculpture" &&
                piece.category === "Sculpture");

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <div className="text-center my-6">
                <h1
                    className="text-5xl mb-6 text-primary"
                    style={{ fontFamily: "Georgia, serif" }}
                >
                    Art & Design Gallery
                </h1>
                <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
                <p
                    className="text-muted-foreground text-lg max-w-3xl mx-auto"
                    style={{ fontFamily: "Inter, sans-serif" }}
                >
                    Discover exceptional visual artwork from our talented
                    community of young artists and designers.
                </p>
            </div>

            <div className="py-6">
                <div className="relative mb-8 max-w-2xl mx-auto">
                    <Search
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        size={20}
                    />
                    <Input
                        type="text"
                        placeholder="Search artwork, artists, categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 text-lg bg-card border-border rounded-xl text-muted-foreground"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    />
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={
                                selectedCategory === category.id
                                    ? "default"
                                    : "outline"
                            }
                            onClick={() => setSelectedCategory(category.id)}
                            className={`${
                                selectedCategory === category.id
                                    ? "bg-primary text-primary-foreground"
                                    : "border-[#d4af37]/30 text-foreground hover:bg-[#d4af37]/10"
                            } px-4 py-2 rounded-lg transition-all duration-200`}
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>

                <div className="text-center mt-6">
                    <p
                        className="text-muted-foreground"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        Showing {filteredPieces.length} of {pieces.length}{" "}
                        pieces
                        {searchQuery && <span> for "{searchQuery}"</span>}
                        {selectedCategory !== "all" && (
                            <span>
                                {" "}
                                in{" "}
                                {
                                    categories.find(
                                        (cat) => cat.id === selectedCategory,
                                    )?.name
                                }
                            </span>
                        )}
                    </p>
                </div>
            </div>

            {pieces.length === 0 ? (
                <div className="text-center">
                    <div className="text-6xl mb-6">🎨</div>
                    <h3
                        className="text-2xl mb-4 text-muted-foreground"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        No submissions available
                    </h3>
                    <p
                        className="text-muted-foreground max-w-md mx-auto"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        There are no gallery submissions yet. Check back later
                        once artwork has been added.
                    </p>
                </div>
            ) : filteredPieces.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-6">🎨</div>
                    <h3
                        className="text-2xl mb-4 text-muted-foreground"
                        style={{ fontFamily: "Georgia, serif" }}
                    >
                        No artwork found
                    </h3>
                    <p
                        className="text-muted-foreground max-w-md mx-auto"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        {searchQuery
                            ? `No pieces match "${searchQuery}". Try different keywords or browse all categories.`
                            : "No pieces match the selected category. Try selecting a different category."}
                    </p>
                    <div className="mt-6">
                        <Button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            variant="outline"
                            className="border-[#d4af37]/30 text-primary hover:bg-primary hover:text-primary-foreground"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-6">
                    {filteredPieces.map((piece) => (
                        <div
                            key={piece.id}
                            className="group bg-card/40 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300"
                        >
                            <div className="relative aspect-[4/5] min-h-[250px] overflow-hidden">
                                {piece.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge
                                            className="bg-primary text-primary-foreground animate-pulse"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            FEATURED
                                        </Badge>
                                    </div>
                                )}

                                <Image
                                    src={piece.images[0]?.asset.url || ""}
                                    alt={piece.images[0]?.alt || piece.title}
                                    fill
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                                    onClick={() => handleView(piece)}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleView(piece);
                                            }}
                                            className="bg-[#0b132b]/80 border-border hover:bg-primary hover:text-primary-foreground"
                                        >
                                            <Eye size={14} className="mr-1" />
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                        variant="outline"
                                        className="border-[#d4af37]/50 text-primary text-xs"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {piece.category}
                                    </Badge>
                                </div>

                                <h3
                                    className="text-lg mb-1 text-foreground"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    {piece.title}
                                </h3>

                                <p
                                    className="text-sm text-muted-foreground mb-3"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    By{" "}
                                    {piece.author.anonymous
                                        ? "Anonymous"
                                        : piece.author.name || "Unknown"}
                                </p>

                                <p
                                    className="text-sm text-muted-foreground mb-4"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    {piece.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Heart size={14} />
                                            {piece.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle size={14} />
                                            {piece.comments}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={14} />
                                            {piece.views}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleLike(piece.id)}
                                            className={`${
                                                piece.isLiked
                                                    ? "text-red-500"
                                                    : "text-muted-foreground"
                                            } hover:text-red-500`}
                                        >
                                            <Heart
                                                size={14}
                                                className={
                                                    piece.isLiked
                                                        ? "fill-current"
                                                        : ""
                                                }
                                            />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleShare(piece)}
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <Share2 size={14} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedPiece && (
                <div className="fixed inset-0 bg-[#0b132b]/90 backdrop-blur-sm z-50 overflow-y-auto">
                    <div className="max-w-6xl max-h-[90vh] my-6 bg-card border border-border rounded-xl mx-4">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div>
                                <h3
                                    className="text-2xl text-primary"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    {selectedPiece.title}
                                </h3>
                                <p
                                    className="text-muted-foreground"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    By{" "}
                                    {selectedPiece.author.anonymous
                                        ? "Anonymous"
                                        : selectedPiece.author.name ||
                                          "Unknown"}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedPiece(null)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(320px,1fr)_minmax(360px,1fr)] min-h-0">
                            <div className="relative bg-[#0b132b]/50 flex items-center justify-center p-6 min-h-[320px] sm:min-h-[360px] lg:min-h-0">
                                {selectedPiece.images.length > 1 ? (
                                    <SubmissionCarousel
                                        images={selectedPiece.images}
                                    />
                                ) : (
                                    <Image
                                        src={selectedPiece.images[0].asset.url}
                                        alt={selectedPiece.title}
                                        fill
                                        className="object-contain min-h-[150px] w-auto"
                                    />
                                )}
                            </div>

                            <div className="p-6 overflow-y-auto min-h-0 flex flex-col max-h-[calc(90vh-180px)]">
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge
                                            variant="outline"
                                            className="border-[#d4af37]/50 text-primary"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {selectedPiece.category}
                                        </Badge>
                                        <span
                                            className="text-sm text-muted-foreground"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        ></span>
                                    </div>

                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {selectedPiece.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Heart size={14} />
                                            {
                                                pieces.find(
                                                    (p) =>
                                                        p.id ===
                                                        selectedPiece.id,
                                                )?.likes
                                            }
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle size={14} />
                                            {
                                                pieces.find(
                                                    (p) =>
                                                        p.id ===
                                                        selectedPiece.id,
                                                )?.comments
                                            }
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye size={14} />
                                            {
                                                pieces.find(
                                                    (p) =>
                                                        p.id ===
                                                        selectedPiece.id,
                                                )?.views
                                            }
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                                handleLike(selectedPiece.id)
                                            }
                                            className={`${
                                                pieces.find(
                                                    (p) =>
                                                        p.id ===
                                                        selectedPiece.id,
                                                )?.isLiked
                                                    ? "text-red-500"
                                                    : "text-muted-foreground"
                                            } hover:text-red-500`}
                                        >
                                            <Heart
                                                size={14}
                                                className={
                                                    pieces.find(
                                                        (p) =>
                                                            p.id ===
                                                            selectedPiece.id,
                                                    )?.isLiked
                                                        ? "fill-current"
                                                        : ""
                                                }
                                            />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                                handleShare(selectedPiece)
                                            }
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <Share2 size={14} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="border-t border-border pt-4">
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                        <div>
                                            <h4
                                                className="text-lg text-foreground"
                                                style={{
                                                    fontFamily:
                                                        "Georgia, serif",
                                                }}
                                            >
                                                Comments
                                            </h4>
                                            <p
                                                className="text-sm text-muted-foreground"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                {comments.length > 0
                                                    ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
                                                    : "No comments yet."}
                                            </p>
                                        </div>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                setIsCommentsModalOpen(true)
                                            }
                                            className="text-primary border-primary hover:bg-[#d4af37]/10"
                                        >
                                            View comments
                                        </Button>
                                    </div>

                                    {commentsError ? (
                                        <div className="text-sm text-red-500 mb-3">
                                            {commentsError}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedPiece && isCommentsModalOpen && (
                <div className="fixed inset-0 z-50 bg-[#0b132b]/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="max-w-3xl w-full max-h-[90vh] bg-card border border-border rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div>
                                <h3
                                    className="text-2xl text-primary"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    Comments for {selectedPiece.title}
                                </h3>
                                <p
                                    className="text-muted-foreground"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    By{" "}
                                    {selectedPiece.author.anonymous
                                        ? "Anonymous"
                                        : selectedPiece.author.name ||
                                          "Unknown"}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCommentsModalOpen(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="p-6 flex h-[calc(90vh-130px)] flex-col overflow-hidden">
                            <div className="space-y-4">
                                <LeaveAComment
                                    galleryId={selectedPiece.id}
                                    onCommentSent={loadComments}
                                />

                                <div className="text-sm text-muted-foreground">
                                    {comments.length > 0
                                        ? `${comments.length} comment${comments.length === 1 ? "" : "s"}`
                                        : "No comments yet."}
                                </div>

                                {commentsError ? (
                                    <div className="text-sm text-red-500">
                                        {commentsError}
                                    </div>
                                ) : null}
                            </div>

                            <div className="mt-4 min-h-0 flex-1 overflow-y-auto rounded-[1.5rem] border border-[#d4af37]/30 bg-[#0b132b]/60 p-4 custom-scrollbar">
                                <SubmissionComments
                                    galleryId={selectedPiece.id}
                                    comments={buildNestedComments(comments)}
                                    onCommentSent={loadComments}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DontGo />
        </>
    );
}
