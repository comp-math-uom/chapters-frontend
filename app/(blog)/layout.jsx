import React, {Suspense} from "react";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import Loading from "@/app/(blog)/loading";

export const metadata = {
    title: "CHAPTERS | Portfolio",
    description: "Chapters - AI/ML Portal",
};

export default function BlogLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow pt-[73px]"> {/* Add padding-top here */}
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
}