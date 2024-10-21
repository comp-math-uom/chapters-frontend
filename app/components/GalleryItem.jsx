import Image from "next/image";

export default function GalleryItem({photo, wrapperStyle}) {
    return (
        <div style={{...wrapperStyle, position: "relative"}}>
            <Image fill src={photo} alt="Gallery Image" placeholder={"blurDataURL" in photo ? "blur" : undefined}/>
        </div>
    );
}