"use client";

import React, { useEffect, useState } from "react";
import MediaGallery from "@/app/components/portfolio/MeidaGallery";
import PortfolioHeader from "@/app/components/portfolio/PortfolioHeader";
import PortfolioService from "@/app/services/portfolioService";
import FloatingButton from "@/app/components/portfolio/FloatingButton";
import NoSearchResults from "@/app/components/portfolio/NoResult";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorBlock from "@/app/components/common/ErrorBlock";

export default function Home() {

    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const [isError, setIsError] = useState(false);

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

        loadInitialItems().then(_ => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="container flex flex-col justify-center m-auto px-20">
            <PortfolioHeader filterFn={handleFilter} resetFn={handleReset}/>
            {galleryItems.length > 0 && !isLoading && !isError && <MediaGallery galleryItems={galleryItems}/>}
            {galleryItems.length === 0 && !isLoading && !isError && <NoSearchResults onClear={handleReset}/>}
            {isLoading && <LoadingSpinner/>}
            {isError && !isLoading && <ErrorBlock msg="We could not load data. Please try again later."/>}
            {isAdmin && <FloatingButton url="/portfolio/add-item"/>}
        </div>
    );
}
