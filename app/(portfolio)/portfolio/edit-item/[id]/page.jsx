"use client";

import PortfolioForm from "@/app/components/portfolio/PortfolioForm";
import FeedbackSection from "@/app/components/portfolio/FeedbackSection";
import portfolioService from "@/app/lib/services/portfolioService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [portfolioItem, setPortfolioItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await portfolioService.fetchGalleryItem(id);
                setPortfolioItem({
                    title: data.topic || "",
                    description: data.description || "",
                    searchTags: data.searchTags || "",
                    image: data.src || "",
                    visible: data.visible || "",
                    featured: data.featured || "",
                    batch: data.batch || "",
                    contributors: data.contributors || "",
                });
                console.log(portfolioItem);
            } catch (error) {
                console.error("Failed to fetch portfolio item:", error);
                setModalMessage("Failed to load portfolio item.");
                setIsErrorModalOpen(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, portfolioItem]);

    const handleSubmit = async (values) => {
        try {
            let response = await portfolioService.addGalleryItem(values);
            console.log(response);
            if (response.status !== 200) {
                setModalMessage("Post updated successfully!");
                setIsSuccessModalOpen(true);
            } else {
                setModalMessage("Failed to update the post. Please try again.");
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            setModalMessage("An unexpected error occurred.");
            setIsErrorModalOpen(true);
        }
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        router.push('/portfolio');
    };

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-4 sm:px-6 md:px-10 lg:px-20">
            <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-10">
                Edit Post
            </h1>
            <PortfolioForm initialValues={portfolioItem} handleSubmit={handleSubmit} />
            <FeedbackSection isAdmin={true} />
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                errorMessage={modalMessage}
            />
            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={handleSuccessModalClose}
                successMessage={modalMessage}
            />
        </div>
    );
}