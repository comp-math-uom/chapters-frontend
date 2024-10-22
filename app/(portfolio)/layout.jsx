import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "CHAPTERS | Portfolio",
    description: "Chapters - AI/ML Portal",
};

export default function PortfolioLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}