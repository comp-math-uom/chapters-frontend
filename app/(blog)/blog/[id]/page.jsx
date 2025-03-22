"use client";

import {notFound} from 'next/navigation';

export default function Page({params}) {
    if (params.id !== "69") {
        return notFound();
    }

    return (
        <div className="container flex flex-wrap justify-center m-auto px-20 gap-20 mt-20">
            {params.id}
        </div>
    );
}