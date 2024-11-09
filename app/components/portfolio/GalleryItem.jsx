import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import GalleryModal from "@/app/components/portfolio/GalleryModal";

export default function GalleryItem({photo: galleryItem, wrapperStyle}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleItemClick = () => {
        setSelectedPhoto(galleryItem);
        onOpen();
    };

    return (
        <>
            <div style={{...wrapperStyle, position: "relative"}}
                 className="rounded-lg overflow-hidden group cursor-pointer"
                 onClick={handleItemClick}
            >
                <div className="transition-transform duration-300 ease-in-out group-hover:scale-105 w-full h-full">
                    <Image
                        fill
                        src={galleryItem.src}
                        placeholder={galleryItem.blurDataURL ? "blur" : undefined}
                        className="object-cover"
                        alt="gallery-image"/>
                </div>
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-start p-4">
                    <h3 className="text-white text-xl font-bold">{galleryItem.topic}</h3>
                </div>
            </div>

            {selectedPhoto && (
                <GalleryModal isOpen={isOpen} onClose={onClose} galleryItem={galleryItem} isAdmin={true} />
            )}
        </>
    );
}