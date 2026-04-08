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
import { Search, Filter, ExternalLink, X } from "lucide-react";
import countries from "@/lib/countryData.json";
// import { SubmissionCard } from "./SubmissionCard";
import type { Organization } from "@/lib/types";
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
            s.subject === selectedSubject;

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
                {sorted.map((org) => (
                    <div
                        key={org.slug}
                        className="bg-card/40 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/60 transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-center items-center gap-4 mb-2">
                            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border border-[#d4af37]/20">
                                <Image
                                    src={org.logo}
                                    alt={org.name}
                                    width={60}
                                    height={60}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3
                                    className="text-lg text-foreground group-hover:text-[#d4af37] transition-colors"
                                    style={{ fontFamily: "Georgia, serif" }}
                                >
                                    {org.name}
                                </h3>
                                <Badge
                                    variant="outline"
                                    className="border-[#d4af37]/30 text-[#d4af37]/80 mt-2"
                                >
                                    {
                                        categories.find(
                                            (cat) => cat.value === org.subject,
                                        )?.title
                                    }
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
                ))}
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
                                    <Badge
                                        variant="outline"
                                        className="border-[#d4af37]/30 text-[#d4af37]/80 mt-2"
                                    >
                                        {
                                            categories.find(
                                                (cat) =>
                                                    cat.value ===
                                                    selectedOrganization.subject,
                                            )?.title
                                        }
                                    </Badge>
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
