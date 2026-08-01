"use client";

import { Button } from "@/components/ui/Button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                Previous
            </Button>

            {pages.map((page) => (
                <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? "min-w-9" : "min-w-9"}
                >
                    {page}
                </Button>
            ))}

            <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    onPageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    );
}
