"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import PortfolioForm from '@/app/components/portfolio/PortfolioForm';
import portfolioService from '@/app/services/portfolioService';
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";

export default function Page() {
    const router = useRouter();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleSubmit = async (values) => {
        try {
            let response = await portfolioService.addGalleryItem(values);
            console.log(response);
            if (response.status !== 200) {
                setModalMessage("Post added successfully!");
                setIsSuccessModalOpen(true);
            } else {
                setModalMessage("Failed to add the post. Please try again.");
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

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-4 sm:px-6 md:px-10 lg:px-20">
            <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-10">
                Add New Post
            </h1>
            <PortfolioForm handleSubmit={handleSubmit}/>
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