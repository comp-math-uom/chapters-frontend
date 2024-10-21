"use client";

import PhotoAlbum from "react-photo-album";
import GalleryItem from "@/app/components/GalleryItem";
import PortfolioService from "@/app/services/portfolioService";
import {useEffect, useState} from "react";

export default function MediaGallery() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        PortfolioService.fetchGalleryItems().then((photos) => {
            setPhotos(photos);
        });
    });

    return (
        <PhotoAlbum
            photos={photos}
            layout="rows"
            renderPhoto={GalleryItem}
            defaultContainerWidth={1200}
            sizes={{ size: "calc(100vw - 240px)" }}
            spacing={10}
            padding={0}
        />
    );
}