import Image from "next/image";

export default function GalleryItem({photo, wrapperStyle}) {

    return (
        <div style={{ ...wrapperStyle, position: "relative" }} className="rounded-lg overflow-hidden group cursor-pointer">
            <div className="transition-transform duration-300 ease-in-out group-hover:scale-105 w-full h-full">
                <Image
                    fill
                    src={photo.src}
                    placeholder={photo.blurDataURL ? "blur" : undefined}
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-start p-4">
                <h3 className="text-white text-xl font-bold">{photo.topic}</h3>
            </div>
        </div>
    );
}