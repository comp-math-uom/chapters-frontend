"use client";

import PortfolioForm from "@/app/components/PortfolioForm";
import FeedbackSection from "@/app/components/FeedbackSection";

export default function Page() {
    const handleSubmit = (values, actions) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('image', values.image);
        values.searchTags.forEach(tag => {
            formData.append('searchTags', tag);
        });
    }

    const initialValues = {
        title: "Test Title",
        description: "Test Description",
        searchTags: ["test", "tags"],
        image: null,
        visible: true,
        featured: true
    }

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-20">
            <h1 className="text-4xl font-bold my-10">
                Edit Post
            </h1>
            <PortfolioForm initialValues={initialValues} handleSubmit={handleSubmit}/>
            <FeedbackSection/>
        </div>
    );
}