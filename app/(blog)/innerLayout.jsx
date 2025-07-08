'use client';

import React, { Suspense } from "react";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import Loading from "@/app/loading";

export default function InnerLayout({children}) {

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow pt-[73px] w-full max-w-full overflow-x-hidden">
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
}