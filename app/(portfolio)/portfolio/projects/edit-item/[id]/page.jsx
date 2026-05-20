"use client";

import PortfolioForm from "@/app/components/portfolio/PortfolioForm";
import portfolioService from "@/app/lib/services/portfolioService";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useAuth } from "@/app/providers/Providers";

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const { auth, initialized } = useAuth();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [portfolioItem, setPortfolioItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Admin-only gate
    useEffect(() => {
        if (!initialized) return;
        if (!auth?.authenticated) {
            router.push('/auth/login');
        } else if (auth.role !== 'admin') {
            router.push('/portfolio/projects');
        }
    }, [initialized, auth, router]);

    // Fetch the item from the API (not from local mock data).
    useEffect(() => {
        if (!id) return;
        let cancelled = false;
        (async () => {
            try {
                const data = await portfolioService.fetchGalleryItem(id);
                if (cancelled || !data) return;
                setPortfolioItem({
                    title: data.topic || "",
                    description: data.description || "",
                    searchTags: data.searchTags || [],
                    image: data.src || data.image || "",
                    visible: data.visible ?? true,
                    featured: data.featured ?? false,
                    batch: data.batch || "",
                    contributors: data.contributors || [],
                    date: data.date ? new Date(data.date) : new Date(),
                });
            } catch (error) {
                console.error("Failed to fetch project:", error);
                setModalMessage("Failed to load project.");
                setIsErrorModalOpen(true);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            const response = await portfolioService.updateGalleryItem(id, values);
            if (response.status === 200) {
                setModalMessage("Project updated successfully!");
                setIsSuccessModalOpen(true);
            } else {
                setModalMessage("Failed to update the project.");
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            setModalMessage(error?.response?.data?.detail || "An unexpected error occurred.");
            setIsErrorModalOpen(true);
        }
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        router.push('/portfolio/projects');
    };

    if (isLoading || !initialized) return <LoadingSpinner />;
    if (!portfolioItem) return null;

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-4 sm:px-6 md:px-10 lg:px-20">
            <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-10">Edit Project</h1>
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
