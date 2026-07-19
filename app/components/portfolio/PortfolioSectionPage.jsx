"use client";

import React, { useEffect, useState } from "react";
import MediaGallery from "@/app/components/portfolio/MeidaGallery";
import PortfolioHeader from "@/app/components/portfolio/PortfolioHeader";
import PortfolioService from "@/app/lib/services/portfolioService";
import FloatingButton from "@/app/components/portfolio/FloatingButton";
import NoSearchResults from "@/app/components/portfolio/NoResult";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorBlock from "@/app/components/common/ErrorBlock";
import { useAuth } from "@/app/providers/Providers";

export default function PortfolioSectionPage({
    section,
    title,
    description,
    categoryOptions,
    createUrl,
    showFeatured = false,
}) {
    const { auth } = useAuth();
    const [galleryItems, setGalleryItems] = useState([]);
    const [featuredItems, setFeaturedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [isError, setIsError] = useState(false);

    const isAdmin = Boolean(auth?.isAdmin);

    const handleFilter = async (filterQuery) => {
        const filteredItems = await PortfolioService.filterItems({
            ...filterQuery,
            section,
        });
        setIsFiltering(true);
        setGalleryItems(filteredItems);
    };

    const handleReset = async () => {
        const items = await PortfolioService.fetchGalleryItems({ section });
        setGalleryItems(items);
        setIsFiltering(false);
    };

    useEffect(() => {
        const loadInitialItems = async () => {
            try {
                const items = await PortfolioService.fetchGalleryItems({ section });
                setGalleryItems(items);

                if (showFeatured) {
                    const featured = await PortfolioService.fetchGalleryItems({
                        section,
                        featured: true,
                    });
                    setFeaturedItems(featured);
                }
            } catch (error) {
                console.error("Failed to load portfolio section:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialItems();
    }, [section, showFeatured]);

    return (
        <div className="container flex flex-col justify-center m-auto px-4 sm:px-6 md:px-10 lg:px-20">
            <PortfolioHeader
                filterFn={handleFilter}
                resetFn={handleReset}
                section={section}
                title={title}
                description={description}
                categoryOptions={categoryOptions}
            />

            {!isFiltering && showFeatured && featuredItems.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Featured</h2>
                    <MediaGallery galleryItems={featuredItems} />
                </div>
            )}

            {galleryItems.length > 0 && !isLoading && !isError && (
                <MediaGallery galleryItems={galleryItems} />
            )}
            {galleryItems.length === 0 && !isLoading && !isError && (
                <NoSearchResults onClear={handleReset} />
            )}
            {isLoading && <LoadingSpinner />}
            {isError && !isLoading && (
                <ErrorBlock msg="We could not load data. Please try again later." />
            )}
            {isAdmin && <FloatingButton url={createUrl} />}
        </div>
    );
}
