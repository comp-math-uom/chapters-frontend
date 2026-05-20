"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import PortfolioForm from '@/app/components/portfolio/PortfolioForm';
import portfolioService from '@/app/lib/services/portfolioService';
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

import { useAuth } from "@/app/providers/Providers";

export default function Page() {
    const router = useRouter();
    const { auth, initialized } = useAuth();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Admin-only — students and anonymous users are redirected home.
    useEffect(() => {
        if (!initialized) return;
        if (!auth?.authenticated) {
            router.push('/auth/login');
        } else if (auth.role !== 'admin') {
            router.push('/portfolio/projects');
        }
    }, [initialized, auth, router]);

    const handleSubmit = async (values) => {
        try {
            const response = await portfolioService.addGalleryItem(values);
            if (response.status === 201 || response.status === 200) {
                setModalMessage("Project added successfully!");
                setIsSuccessModalOpen(true);
            } else {
                setModalMessage("Failed to add the project. Please try again.");
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

    if (!initialized || !auth?.authenticated || auth.role !== 'admin') {
        return <LoadingSpinner />;
    }

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-4 sm:px-6 md:px-10 lg:px-20">
            <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-10">Add New Project</h1>
            <PortfolioForm handleSubmit={handleSubmit} />
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
