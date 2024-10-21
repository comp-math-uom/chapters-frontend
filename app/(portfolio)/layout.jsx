import React from "react";
import Navbar from "@/app/components/Navbar";

export const metadata = {
    title: "CHAPTERS | Portfolio",
    description: "Chapters - AI/ML Portal",
};

export default function PortfolioLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            {children}
            <h1>CHAPTERS - Footer</h1>
        </div>
    );
}