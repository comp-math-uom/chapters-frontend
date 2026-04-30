import React, { Suspense } from "react";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import Loading from "@/app/loading";

export const metadata = {
    title: "Student Portfolios",
    description: "Explore the innovative projects and technical journeys of BSc Hons in Artificial Intelligence students from the University of Moratuwa.",
    openGraph: {
        title: "AI Student Portfolios | University of Moratuwa",
        description: "Showcasing the work of AI degree students at UoM.",
    }
};

export default function PortfolioLayout({children}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow pt-[73px]">
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
}