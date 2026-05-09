// app/submissions/SubmissionsClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Search, Filter, ExternalLink, X, Music, Youtube } from "lucide-react";
import countries from "@/lib/countryData.json";
// import { SubmissionCard } from "./SubmissionCard";
import type { Organization, subjectArea } from "@/lib/types";
import { Badge } from "./ui/Badge";
import Image from "next/image";
import Link from "next/link";

interface OrganizationProps {
    organizations: Organization[];
    categories: { title: string; value: string }[];
    selectedSlug?: string;
}

export default function OrganizationsClient({
    organizations,
    categories,
    selectedSlug,
}: OrganizationProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All Subject Areas");
    const [subjectSearch, setSubjectSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("All Countries");
    const [countrySearch, setCountrySearch] = useState("");
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(null);

    const filteredCategories = categories.filter((c) =>
        c.title.toLowerCase().includes(subjectSearch.toLowerCase()),
    );

    const filteredCountries = (
        countries as Array<{ name: string; code: string; emoji: string }>
    ).filter((country) =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase()),
    );

    // Filter by search term and category
    const sorted = organizations.filter((s) => {
        const matchesSearch =
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.scope.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedSubject === "All Subject Areas" ||
            (s.subjects && s.subjects.includes(selectedSubject as subjectArea));

        const matchesCountry =
            selectedCountry === "All Countries" ||
            s.location.country === selectedCountry;

        return matchesSearch && matchesCategory && matchesCountry;
    });

    useEffect(() => {
        if (!selectedSlug) {
            return;
        }

        const organization = organizations.find(
            (org) => org.slug === selectedSlug,
        );

        if (organization) {
            setSelectedOrganization(organization);
        } else {
            setSelectedOrganization(null);
        }
    }, [selectedSlug, organizations]);

    const openOrganization = (organization: Organization) => {
        router.push(`/orgs/${organization.slug}`);
        setSelectedOrganization(organization);
    };

    const closeModal = () => {
        setSelectedOrganization(null);
        router.replace("/foundation");
    };

    // console.log(organizations);

    // // Sort filtered submissions
    // const sorted = [...filtered].sort((a, b) => {
    //     switch (sortBy) {
    //         case "newest":
    //             return (
    //                 new Date(b.submittedDate).getTime() -
    //                 new Date(a.submittedDate).getTime()
    //             );
    //         case "oldest":
    //             return (
    //                 new Date(a.submittedDate).getTime() -
    //                 new Date(b.submittedDate).getTime()
    //             );
    //         // case "popular":
    //         //     return (b.likes || 0) - (a.likes || 0);
    //         // case "views":
    //         //     return (b.views || 0) - (a.views || 0);
    //         default:
    //             return 0;
    //     }
    // });

    return (
        <>
            {/* Search and Filters */}
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-6 mb-8 text-muted-foreground">
                <div className="flex flex-col gap-4">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            size={20}
                        />
                        <Input
                            placeholder="Search organizations by name, location, description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-input-background border-border text-sm"
                            style={{ fontFamily: "Inter, sans-serif" }}
                        />
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row">
                        <Select
                            value={selectedSubject}
                            onValueChange={setSelectedSubject}
                        >
                            <SelectTrigger className="bg-input-background border-border">
                                <div className="flex items-center gap-2">
                                    <Filter size={16} />
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="max-h-72 w-full">
                                <div className="px-3 py-2">
                                    <Input
                                        placeholder="Search subject areas..."
                                        value={subjectSearch}
                                        onChange={(e) =>
                                            setSubjectSearch(e.target.value)
                                        }
                                        className="bg-input-background border-border"
                                    />
                                </div>
                                <div className="border-b border-border mx-3" />
                                <SelectItem value="All Subject Areas">
                                    All Subject Areas
                                </SelectItem>
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((c) => (
                                        <SelectItem
                                            key={c.value}
                                            value={c.title}
                                        >
                                            {c.title}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                        No matching subject areas.
                                    </div>
                                )}
                            </SelectContent>
                        </Select>

                        <Select
                            value={selectedCountry}
                            onValueChange={setSelectedCountry}
                        >
                            <SelectTrigger className=" bg-input-background border-border">
                                <div className="flex items-center gap-2">
                                    <Filter size={16} />
                                    <SelectValue />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="max-h-72">
                                <div className="px-3 py-2">
                                    <Input
                                        placeholder="Search countries..."
                                        value={countrySearch}
                                        onChange={(e) =>
                                            setCountrySearch(e.target.value)
                                        }
                                        className="bg-input-background border-border"
                                    />
                                </div>
                                <div className="border-b border-border mx-3" />
                                <SelectItem value="All Countries">
                                    All Countries
                                </SelectItem>
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                        <SelectItem
                                            key={country.code}
                                            value={country.name}
                                        >
                                            {country.emoji} {country.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                        No matching countries.
                                    </div>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {/* Results Count */}
            <p
                className="text-sm text-muted-foreground mb-6 text-center"
                style={{ fontFamily: "Inter, sans-serif" }}
            >
                Showing {sorted.length} of {organizations.length} organizations
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((org) => {
                    // console.log(org);
                    return (
                        <div
                            key={org.slug}
                            className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/60 transition-all duration-300 group min-w-0"
                        >
                            <div className="flex items-center gap-4 mb-2 min-w-0">
                                <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border border-[#d4af37]/20">
                                    <Image
                                        src={org.logo}
                                        alt={org.name}
                                        width={60}
                                        height={60}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className="text-lg text-foreground group-hover:text-[#d4af37] transition-colors truncate"
                                        style={{ fontFamily: "Georgia, serif" }}
                                    >
                                        {org.name}
                                    </h3>
                                    <Badge
                                        variant="outline"
                                        className="border-[#d4af37]/30 text-[#d4af37]/80 mt-2 max-w-full overflow-hidden"
                                    >
                                        <span className="truncate">
                                            {org.subjects[0]}
                                        </span>
                                    </Badge>
                                </div>
                            </div>

                            <p
                                className="text-muted-foreground mb-4 leading-relaxed line-clamp-2"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                {org.description}
                            </p>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openOrganization(org)}
                                    className="flex-1 border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* No Results */}
            {sorted.length === 0 && (
                <div className="text-center py-12">
                    <p
                        className="text-muted-foreground mb-4"
                        style={{ fontFamily: "Inter, sans-serif" }}
                    >
                        No submissions found matching your criteria.
                    </p>
                    <Button
                        onClick={() => {
                            setSearchTerm("");
                            setSubjectSearch("");
                            setSelectedSubject("All Subject Areas");
                        }}
                        variant="outline"
                        className="border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#d4af37]-foreground"
                    >
                        Clear Filters
                    </Button>
                </div>
            )}

            {/* Organization Details Modal */}
            {selectedOrganization && (
                <div className="fixed inset-0 bg-[#0b132b]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="max-w-3xl w-full max-h-[90vh] bg-card border border-border rounded-xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#d4af37]/20">
                                    <Image
                                        src={selectedOrganization.logo}
                                        alt={selectedOrganization.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h2
                                        className="text-2xl text-primary"
                                        style={{ fontFamily: "Georgia, serif" }}
                                    >
                                        {selectedOrganization.name}
                                    </h2>
                                    {selectedOrganization.subjects &&
                                        selectedOrganization.subjects.length >
                                            0 && (
                                            <div className="flex gap-2 flex-wrap mt-2">
                                                {selectedOrganization.subjects.map(
                                                    (subject) => (
                                                        <Badge
                                                            key={subject}
                                                            variant="outline"
                                                            className="border-[#d4af37]/30 text-[#d4af37]/80 mt-2 max-w-full truncate block"
                                                        >
                                                            {subject}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeModal}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
                            <div className="space-y-6">
                                {/* Description */}
                                <div>
                                    <h3
                                        className="text-lg font-semibold text-primary mb-2"
                                        style={{ fontFamily: "Georgia, serif" }}
                                    >
                                        About
                                    </h3>
                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                    >
                                        {selectedOrganization.description}
                                    </p>
                                </div>

                                {/* Social Media */}
                                {selectedOrganization.socials &&
                                    selectedOrganization.socials.length > 0 && (
                                        <div>
                                            <h3
                                                className="text-lg font-semibold text-primary mb-3"
                                                style={{
                                                    fontFamily:
                                                        "Georgia, serif",
                                                }}
                                            >
                                                Organization Socials
                                            </h3>
                                            <div className="flex gap-3 flex-wrap">
                                                {selectedOrganization.socials.map(
                                                    (social) => {
                                                        let url = "";
                                                        let icon = null;
                                                        const iconProps = {
                                                            size: 16,
                                                            className: "mr-2",
                                                        };

                                                        switch (
                                                            social.platform
                                                        ) {
                                                            case "linkedin":
                                                                url =
                                                                    social.username;
                                                                icon = (
                                                                    <svg
                                                                        width={
                                                                            16
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                        viewBox="0 0 24 24"
                                                                        className="mr-2"
                                                                        fill="#d4af37"
                                                                    >
                                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.733 0-9.636h3.554v1.364c.429-.659 1.191-1.601 2.896-1.601 2.115 0 3.704 1.383 3.704 4.356v5.517zM5.337 9.432c-1.144 0-1.915-.759-1.915-1.707 0-.955.771-1.707 1.951-1.707 1.179 0 1.914.752 1.939 1.707 0 .948-.76 1.707-1.975 1.707zm1.581 11.02h-3.154v-9.636h3.154v9.636zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                                                                    </svg>
                                                                );
                                                                break;
                                                            case "instagram":
                                                                url = `https://instagram.com/${social.username}`;
                                                                icon = (
                                                                    <svg
                                                                        width={
                                                                            16
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                        viewBox="0 0 24 24"
                                                                        className="mr-2"
                                                                        fill="#d4af37"
                                                                    >
                                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                                    </svg>
                                                                );
                                                                break;
                                                            case "twitter":
                                                                url = `https://twitter.com/${social.username}`;
                                                                icon = (
                                                                    <svg
                                                                        width={
                                                                            16
                                                                        }
                                                                        height={
                                                                            16
                                                                        }
                                                                        viewBox="0 0 24 24"
                                                                        className="mr-2"
                                                                        fill="#d4af37"
                                                                    >
                                                                        <path d="M23.953 4.57a10 10 0 002.856-3.915 9.964 9.964 0 01-2.824.856 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                                    </svg>
                                                                );
                                                                break;
                                                            case "tiktok":
                                                                url = `https://tiktok.com/@${social.username}`;
                                                                icon = (
                                                                    <Music
                                                                        {...iconProps}
                                                                    />
                                                                );
                                                                break;
                                                            case "youtube":
                                                                url = `https://youtube.com/@${social.username}`;
                                                                icon = (
                                                                    <Youtube
                                                                        {...iconProps}
                                                                    />
                                                                );
                                                                break;
                                                            case "website":
                                                                url =
                                                                    social.username;
                                                                break;
                                                        }

                                                        return (
                                                            <Button
                                                                key={
                                                                    social._key
                                                                }
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                                                                asChild
                                                            >
                                                                <a
                                                                    href={url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center"
                                                                >
                                                                    {icon}
                                                                    {
                                                                        social.username
                                                                    }
                                                                </a>
                                                            </Button>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {/* Location & Scope */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3
                                            className="text-sm font-semibold text-primary mb-1"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            Location
                                        </h3>
                                        <p
                                            className="text-muted-foreground"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {selectedOrganization.location
                                                .state && (
                                                <>
                                                    {
                                                        selectedOrganization
                                                            .location.state
                                                    }
                                                    ,{" "}
                                                </>
                                            )}

                                            {
                                                selectedOrganization.location
                                                    .country
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <h3
                                            className="text-sm font-semibold text-primary mb-1"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            Looking for members
                                        </h3>
                                        <p
                                            className="text-muted-foreground"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {selectedOrganization.scope ==
                                            "city"
                                                ? "In my city"
                                                : selectedOrganization.scope ==
                                                    "country"
                                                  ? "In my country"
                                                  : "Worldwide"}
                                        </p>
                                    </div>
                                </div>

                                {/* Goal */}
                                {selectedOrganization.goal && (
                                    <div>
                                        <h3
                                            className="text-lg font-semibold text-primary mb-2"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            Goal
                                        </h3>
                                        <p
                                            className="text-muted-foreground leading-relaxed"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {selectedOrganization.goal}
                                        </p>
                                    </div>
                                )}

                                {/* Involvement */}
                                {selectedOrganization.involvement && (
                                    <div>
                                        <h3
                                            className="text-lg font-semibold text-primary mb-2"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            How to Get Involved
                                        </h3>
                                        <p
                                            className="text-muted-foreground leading-relaxed"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {selectedOrganization.involvement}
                                        </p>
                                    </div>
                                )}

                                {/* Open Roles */}
                                {selectedOrganization.openRoles && (
                                    <div>
                                        <h3
                                            className="text-lg font-semibold text-primary mb-2"
                                            style={{
                                                fontFamily: "Georgia, serif",
                                            }}
                                        >
                                            Open Roles
                                        </h3>
                                        <p
                                            className="text-muted-foreground leading-relaxed"
                                            style={{
                                                fontFamily: "Inter, sans-serif",
                                            }}
                                        >
                                            {selectedOrganization.openRoles}
                                        </p>
                                    </div>
                                )}

                                {/* CTA Button */}
                                <div className="flex gap-3 pt-4 border-t border-border">
                                    <Button
                                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                        }}
                                        asChild
                                    >
                                        <Link
                                            href={
                                                selectedOrganization.applicationLink
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <ExternalLink
                                                size={16}
                                                className="mr-2"
                                            />
                                            Apply
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
