import React from "react";

export const metadata = {
    title: "CHAPTERS | Portfolio",
    description: "Chapters - AI/ML Portal",
};

export default function PortfolioLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <h1>CHAPTERS - Portfolio Navbar</h1>
            {children}
            <h1>CHAPTERS - Footer</h1>
        </div>
    );
}