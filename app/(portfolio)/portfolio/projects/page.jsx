"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MediaGallery from "@/app/components/portfolio/MediaGallery";
import PortfolioHeader from "@/app/components/portfolio/PortfolioHeader";
import PortfolioService from "@/app/lib/services/portfolioService";
import NoSearchResults from "@/app/components/portfolio/NoResult";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorBlock from "@/app/components/common/ErrorBlock";
import Pagination from "@/app/components/common/Pagination";
import { useAuth } from "@/app/providers/Providers";
import { useNav } from "@/app/providers/NavigationProvider";

const PAGE_SIZE = 12;

export default function ProjectsPage() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isFiltered, setIsFiltered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { auth, initialized } = useAuth();
    const { setNavActionButton } = useNav();
    const router = useRouter();
    const isAdmin = auth?.role === "admin";

    const loadPage = async (pageToLoad = 1) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const result = await PortfolioService.fetchProjectsPage({ page: pageToLoad, limit: PAGE_SIZE });
            setGalleryItems(result.items);
            setTotal(result.total);
            setPage(result.page);
            setIsFiltered(false);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilter = async (filterQuery) => {
        setIsLoading(true);
        const items = await PortfolioService.filterItems(filterQuery);
        setGalleryItems(items);
        setTotal(items.length);
        setIsFiltered(true);
        setIsLoading(false);
    };

    const handleReset = () => {
        loadPage(1);
    };

    // Initial load + reload when auth resolves (so admin sees hidden items).
    useEffect(() => {
        if (initialized) loadPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, isAdmin]);

    useEffect(() => {
        if (isAdmin) {
            setNavActionButton({
                label: "+ New Project",
                action: () => router.push("/portfolio/projects/add-item"),
            });
        } else {
            setNavActionButton({ label: "", action: () => { } });
        }
        return () => setNavActionButton({ label: "", action: () => { } });
    }, [isAdmin, setNavActionButton, router]);

    const totalPages = isFiltered ? 1 : Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className="container flex flex-col justify-center m-auto px-4 sm:px-6 md:px-10 lg:px-20">
            <PortfolioHeader
                filterFn={handleFilter}
                resetFn={handleReset}
                title="PROJECTS"
                subtitle="Browse student-built AI projects across batches."
            />
            {galleryItems.length > 0 && !isLoading && !isError && (
                <>
                    <MediaGallery galleryItems={galleryItems} />
                    {!isFiltered && (
                        <Pagination page={page} totalPages={totalPages} onChange={loadPage} />
                    )}
                </>
            )}
            {galleryItems.length === 0 && !isLoading && !isError && <NoSearchResults onClear={handleReset} />}
            {isLoading && <LoadingSpinner />}
            {isError && !isLoading && <ErrorBlock msg="We could not load data. Please try again later." />}
        </div>
    );
}
