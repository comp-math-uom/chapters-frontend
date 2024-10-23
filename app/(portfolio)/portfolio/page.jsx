"use client";

import React, {useEffect, useState} from "react";
import MediaGallery from "@/app/components/portfolio/MeidaGallery";
import PortfolioHeader from "@/app/components/portfolio/PortfolioHeader";
import PortfolioService from "@/app/services/portfolioService";
import FloatingButton from "@/app/components/portfolio/FloatingButton";
import NoSearchResults from "@/app/components/portfolio/NoResult";
import LoadingSpinner from "@/app/components/portfolio/LoadingSpinner";

export default function Home() {

    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleFilter = async (filterQuery) => {
        console.log(filterQuery);
        const filteredItems = await PortfolioService.filterItems(filterQuery);
        setGalleryItems(filteredItems);
    }

    const handleReset = async () => {
        const items = await PortfolioService.fetchGalleryItems();
        setGalleryItems(items);
    }

    useEffect(() => {
        const loadInitialItems = async () => {
            const items = await PortfolioService.fetchGalleryItems();
            setGalleryItems(items);
            setIsLoading(false);
        };

        loadInitialItems();
    }, []);

    return (
        <div className="container flex flex-col justify-center m-auto px-20">
            <PortfolioHeader filterFn={handleFilter} resetFn={handleReset} />
            {galleryItems.length > 0 && !isLoading && <MediaGallery galleryItems={galleryItems}/>}
            {galleryItems.length === 0 && !isLoading && <NoSearchResults onClear={handleReset}/>}
            {isLoading && <LoadingSpinner />}
            <FloatingButton url="/portfolio/add-item" />
        </div>
    );
}
