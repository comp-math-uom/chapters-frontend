"use client";

import PortfolioForm from "@/app/components/portfolio/PortfolioForm";
import portfolioService from "@/app/lib/services/portfolioService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useAuth } from "@/app/providers/Providers";

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [portfolioItem, setPortfolioItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { auth, initialized } = useAuth();

    useEffect(() => {
        if (initialized && !auth?.isAdmin) {
            router.push('/');
        }
    }, [initialized, auth, router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await portfolioService.fetchGalleryItem(id, { includeHidden: true });
                setPortfolioItem({
                    title: data.topic || "",
                    description: data.description || "",
                    section: data.section || "projects",
                    category: data.category || "",
                    searchTags: data.search_tags || [],
                    image: data.image || "",
                    visible: data.visibility ?? true,
                    featured: data.featured ?? false,
                    batch: data.batch || "",
                    contributors: data.contributors || [],
                    date: data.date || new Date(),
                });
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
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            const payload = {
                id,
                topic: values.title,
                description: values.description,
                section: values.section,
                category: values.category,
                batch: values.batch,
                contributors: values.contributors,
                search_tags: values.searchTags,
                date: values.date,
                visibility: values.visible,
                featured: values.featured,
                image: values.image,
            };
            const response = await portfolioService.updateGalleryItem(payload);
            if (response.status === 200) {
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