import React from "react";
import MediaGallery from "@/app/components/MeidaGallery";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Home() {
    return (
        <div className="container flex flex-col justify-center m-auto px-20">
            <Header />
            <MediaGallery />
        </div>
    );
}
