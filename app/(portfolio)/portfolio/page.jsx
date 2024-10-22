import React from "react";
import MediaGallery from "@/app/components/MeidaGallery";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FloatingButton from "@/app/components/FloatingButton";


export default function Home() {
    return (
        <div className="container flex flex-col justify-center px-20 m-auto">
            <Header />
            <MediaGallery />
            <FloatingButton url="/portfolio/add-item" />
        </div>
    );
}
