"use client";

import React, {useEffect, useState} from "react";
import MediaGallery from "@/app/components/MeidaGallery";
import PortfolioHeader from "@/app/components/PortfolioHeader";
import PortfolioService from "@/app/services/portfolioService";
import FloatingButton from "@/app/components/FloatingButton";

export default function Home() {

    const [galleryItems, setGalleryItems] = useState([]);

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
        };

        loadInitialItems();
    }, []);

    return (
        <div className="container flex flex-col justify-center m-auto px-20">
            <PortfolioHeader filterFn={handleFilter} resetFn={handleReset} />
            <MediaGallery galleryItems={galleryItems} />
            <FloatingButton url="/portfolio/add-item" />
        </div>
    );
}
