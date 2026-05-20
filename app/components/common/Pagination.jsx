"use client";

import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

/**
 * Compact 1..N page selector with prev/next.
 * Shows up to 5 page buttons; collapses with ellipses on either side when needed.
 */
export default function Pagination({ page, totalPages, onChange }) {
    if (totalPages <= 1) return null;

    const goTo = (next) => {
        const clamped = Math.max(1, Math.min(totalPages, next));
        if (clamped !== page) onChange(clamped);
    };

    // Compute which page numbers to render.
    const window = 1; // pages on each side of the current page
    const pages = [];
    const lo = Math.max(2, page - window);
    const hi = Math.min(totalPages - 1, page + window);

    pages.push(1);
    if (lo > 2) pages.push("…");
    for (let p = lo; p <= hi; p += 1) pages.push(p);
    if (hi < totalPages - 1) pages.push("…");
    if (totalPages > 1) pages.push(totalPages);

    return (
        <HStack spacing={1} justify="center" my={8} flexWrap="wrap">
            <IconButton
                aria-label="Previous page"
                icon={<ChevronLeftIcon />}
                size="sm"
                variant="ghost"
                isDisabled={page <= 1}
                onClick={() => goTo(page - 1)}
            />
            {pages.map((p, idx) =>
                p === "…" ? (
                    <Text key={`ellipsis-${idx}`} px={2} color="gray.500" fontSize="sm">…</Text>
                ) : (
                    <Button
                        key={p}
                        size="sm"
                        variant={p === page ? "solid" : "ghost"}
                        bg={p === page ? "black" : undefined}
                        color={p === page ? "white" : undefined}
                        _hover={p === page ? { bg: "gray.800" } : undefined}
                        onClick={() => goTo(p)}
                    >
                        {p}
                    </Button>
                )
            )}
            <IconButton
                aria-label="Next page"
                icon={<ChevronRightIcon />}
                size="sm"
                variant="ghost"
                isDisabled={page >= totalPages}
                onClick={() => goTo(page + 1)}
            />
        </HStack>
    );
}
