"use client";

import PortfolioForm from "@/app/components/PortfolioForm";

export default function Page() {

    const handleSubmit = (values, actions) => {
        console.log(values);
    }

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-20">
            <h1 className="text-4xl font-bold my-10">
                Add New Post
            </h1>
            <PortfolioForm handleSubmit={handleSubmit}/>
        </div>
    );
}