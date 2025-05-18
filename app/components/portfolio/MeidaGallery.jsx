"use client";

import PhotoAlbum from "react-photo-album";
import GalleryItem from "@/app/components/portfolio/GalleryItem";

export default function MediaGallery({galleryItems}) {

    return (
        <PhotoAlbum
            photos={galleryItems}
            layout="rows"
            renderPhoto={GalleryItem}
            defaultContainerWidth={1200}
            sizes={{
                size: "(max-width: 640px) calc(100vw - 16px), (max-width: 1024px) calc(100vw - 48px), calc(100vw - 240px)"
            }}
            spacing={10}
            padding={0}
        />
    );
}