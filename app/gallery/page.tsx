"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Eye, X, Search } from "lucide-react";
import { DontGo } from "@/components/DontGo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

interface ArtPiece {
    id: number;
    title: string;
    artist: string;
    description: string;
    image: string;
    category: string;
    date: string;
    likes: number;
    comments: number;
    views: number;
    isNew: boolean;
    isLiked: boolean;
}

// Categories for filtering
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

const artPieces: ArtPiece[] = [
    {
        id: 1,
        title: "Digital Dreams",
        artist: "Maya Chen",
        description:
            "A vibrant digital composition exploring the intersection of technology and imagination.",
        image: "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzU2OTI1ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Digital Art",
        date: "January 2025",
        likes: 24,
        comments: 8,
        views: 156,
        isNew: true,
        isLiked: false,
    },
    {
        id: 2,
        title: "Urban Canvas",
        artist: "Alex Rodriguez",
        description:
            "Mixed media painting capturing the energy and chaos of city life through bold strokes and vibrant colors.",
        image: "https://images.unsplash.com/photo-1681239063386-fc4a373c927b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGFydHdvcmslMjBjYW52YXN8ZW58MXx8fHwxNzU3MDIyMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Painting",
        date: "December 2024",
        likes: 31,
        comments: 12,
        views: 203,
        isNew: false,
        isLiked: false,
    },
    {
        id: 3,
        title: "Geometric Harmony",
        artist: "Sam Kim",
        description:
            "An intricate illustration exploring mathematical beauty through geometric patterns and color theory.",
        image: "https://images.unsplash.com/photo-1605007623951-d53263481857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGx1c3RyYXRpb24lMjBjcmVhdGl2ZSUyMGFydHxlbnwxfHx8fDE3NTcwMjIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Illustration",
        date: "January 2025",
        likes: 18,
        comments: 5,
        views: 127,
        isNew: true,
        isLiked: false,
    },
    {
        id: 4,
        title: "Fluid Emotions",
        artist: "Jordan Taylor",
        description:
            "Abstract expression of human emotions through flowing forms and dynamic color transitions.",
        image: "https://images.unsplash.com/photo-1699568542323-ff98aca8ea6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwYXJ0fGVufDF8fHx8MTc1Njk2MTU1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Abstract",
        date: "November 2024",
        likes: 42,
        comments: 16,
        views: 289,
        isNew: false,
        isLiked: false,
    },
    {
        id: 5,
        title: "Moments in Time",
        artist: "Casey Wu",
        description:
            "A photographic series capturing fleeting moments of beauty in everyday urban environments.",
        image: "https://images.unsplash.com/photo-1611087966028-bc70bc75d5f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGFydGlzdGljJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzU3MDIyMDcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Photography",
        date: "December 2024",
        likes: 37,
        comments: 11,
        views: 198,
        isNew: false,
        isLiked: false,
    },
    {
        id: 6,
        title: "Metamorphosis",
        artist: "Riley Park",
        description:
            "A contemporary sculpture exploring themes of transformation and growth through organic forms.",
        image: "https://images.unsplash.com/photo-1707578087102-92520fda8f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHR1cmUlMjBtb2Rlcm4lMjBhcnR8ZW58MXx8fHwxNzU3MDIyMDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Sculpture",
        date: "January 2025",
        likes: 29,
        comments: 9,
        views: 164,
        isNew: true,
        isLiked: false,
    },
    {
        id: 7,
        title: "Street Portraits",
        artist: "Emma Stone",
        description:
            "Candid street photography capturing authentic human expressions and urban stories.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzAyMjA3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Art and/or Photography",
        date: "January 2025",
        likes: 45,
        comments: 18,
        views: 234,
        isNew: true,
        isLiked: false,
    },
    {
        id: 8,
        title: "Mixed Media Collage",
        artist: "Kai Johnson",
        description:
            "An experimental piece combining traditional painting techniques with photography and digital elements.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhlZCUyMG1lZGlhJTIwY29sbGFnZSUyMGFydHxlbnwxfHx8fDE3NTcwMjIwODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Art and/or Photography",
        date: "December 2024",
        likes: 28,
        comments: 7,
        views: 172,
        isNew: false,
        isLiked: false,
    },
];

export default function ArtDesignPage() {
    const [pieces, setPieces] = useState<ArtPiece[]>(artPieces);
    const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null);
    const [commentText, setCommentText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Disable screenshot capability when modal is open
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedPiece) {
                // Disable common screenshot shortcuts
                if (
                    (e.metaKey &&
                        e.shiftKey &&
                        (e.key === "3" || e.key === "4" || e.key === "5")) || // Mac screenshots
                    e.key === "PrintScreen" || // Windows screenshot
                    (e.altKey && e.key === "PrintScreen") || // Alt + PrintScreen
                    (e.ctrlKey && e.shiftKey && e.key === "S") // Some apps use this
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

    const handleLike = (pieceId: number) => {
        setPieces((prev) =>
            prev.map((piece) =>
                piece.id === pieceId
                    ? {
                          ...piece,
                          isLiked: !piece.isLiked,
                          likes: piece.isLiked
                              ? piece.likes - 1
                              : piece.likes + 1,
                      }
                    : piece,
            ),
        );
    };

    const handleView = (piece: ArtPiece) => {
        setSelectedPiece(piece);
        setPieces((prev) =>
            prev.map((p) =>
                p.id === piece.id ? { ...p, views: p.views + 1 } : p,
            ),
        );
    };

    const handleShare = (piece: ArtPiece) => {
        navigator.clipboard.writeText(
            `Check out "${piece.title}" by ${piece.artist} on Star to Write Art & Design!`,
        );
        alert("Link copied to clipboard!");
    };

    const handleComment = () => {
        if (commentText.trim() && selectedPiece) {
            setPieces((prev) =>
                prev.map((piece) =>
                    piece.id === selectedPiece.id
                        ? { ...piece, comments: piece.comments + 1 }
                        : piece,
                ),
            );
            setCommentText("");
            alert("Comment added!");
        }
    };

    // Filter pieces based on search query and category
    const filteredPieces = pieces.filter((piece) => {
        const matchesSearch =
            piece.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            piece.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                <div className="text-center mb-12">
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

                {/* Search and Filter Section */}
                <div className="mb-12">
                    {/* Search Bar */}
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

                    {/* Category Filters */}
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

                    {/* Results Counter */}
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
                                            (cat) =>
                                                cat.id === selectedCategory,
                                        )?.name
                                    }
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Art Grid */}
                {filteredPieces.length === 0 ? (
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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPieces.map((piece) => (
                            <div
                                key={piece.id}
                                className="group bg-card/40 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    {piece.isNew && (
                                        <div className="absolute top-4 left-4 z-10">
                                            <Badge
                                                className="bg-primary text-primary-foreground animate-pulse"
                                                style={{
                                                    fontFamily:
                                                        "Inter, sans-serif",
                                                }}
                                            >
                                                NEW
                                            </Badge>
                                        </div>
                                    )}

                                    <img
                                        src={piece.image}
                                        alt={piece.title}
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
                                                <Eye
                                                    size={14}
                                                    className="mr-1"
                                                />
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
                                        <span
                                            className="text-xs text-muted-foreground"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {piece.date}
                                        </span>
                                    </div>

                                    <h3
                                        className="text-lg mb-1 text-foreground"
                                        style={{ fontFamily: "Georgia, serif" }}
                                    >
                                        {piece.title}
                                    </h3>

                                    <p
                                        className="text-sm text-muted-foreground mb-3"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        By {piece.artist}
                                    </p>

                                    <p
                                        className="text-sm text-muted-foreground mb-4"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
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
                                                onClick={() =>
                                                    handleLike(piece.id)
                                                }
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
                                                onClick={() =>
                                                    handleShare(piece)
                                                }
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
            </div>

            {/* Art Piece Modal */}
            {selectedPiece && (
                <div className="fixed inset-0 bg-[#0b132b]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="max-w-4xl w-full max-h-[90vh] bg-card border border-border rounded-xl overflow-hidden">
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
                                    By {selectedPiece.artist}
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

                        <div className="grid lg:grid-cols-2 max-h-[calc(90vh-100px)] overflow-y-auto">
                            <div className="relative bg-[#0b132b]/50 flex items-center justify-center p-8">
                                <img
                                    src={selectedPiece.image}
                                    alt={selectedPiece.title}
                                    className="max-w-full max-h-96 object-contain select-none"
                                    style={{
                                        userSelect: "none",
                                        pointerEvents: "none",
                                    }}
                                    onDragStart={(e) => e.preventDefault()}
                                />
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
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
                                        >
                                            {selectedPiece.date}
                                        </span>
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

                                <div className="flex items-center justify-between">
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
                                    <h4
                                        className="text-lg mb-3 text-foreground"
                                        style={{ fontFamily: "Georgia, serif" }}
                                    >
                                        Leave a Comment
                                    </h4>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={commentText}
                                            onChange={(e) =>
                                                setCommentText(e.target.value)
                                            }
                                            placeholder="Share your thoughts..."
                                            className="flex-1 px-3 py-2 bg-input-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        />
                                        <Button
                                            onClick={handleComment}
                                            className="bg-primary text-primary-foreground hover:bg-[#d4af37]/90"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            Comment
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DontGo />
        </>
    );
}
