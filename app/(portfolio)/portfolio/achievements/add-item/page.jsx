"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AchievementForm from "@/app/components/portfolio/AchievementForm";
import achievementService from "@/app/lib/services/achievementService";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useAuth } from "@/app/providers/Providers";

export default function Page() {
    const router = useRouter();
    const { auth, initialized } = useAuth();
    const [errOpen, setErrOpen] = useState(false);
    const [succOpen, setSuccOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (!initialized) return;
        if (!auth?.authenticated) router.push('/auth/login');
        else if (auth.role !== 'admin') router.push('/portfolio/achievements');
    }, [initialized, auth, router]);

    const handleSubmit = async (values) => {
        try {
            const res = await achievementService.create(values);
            if (res.status === 201 || res.status === 200) {
                setMsg("Achievement added!");
                setSuccOpen(true);
            } else {
                setMsg("Failed to add achievement.");
                setErrOpen(true);
            }
        } catch (err) {
            setMsg(err?.response?.data?.detail || "Unexpected error.");
            setErrOpen(true);
        }
    };

    const onSuccClose = () => {
        setSuccOpen(false);
        router.push('/portfolio/achievements');
    };

    if (!initialized || !auth?.authenticated || auth.role !== 'admin') return <LoadingSpinner />;

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-4 sm:px-6 md:px-10 lg:px-20">
            <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-10">Add New Achievement</h1>
            <AchievementForm handleSubmit={handleSubmit} />
            <ErrorModal isOpen={errOpen} onClose={() => setErrOpen(false)} errorMessage={msg} />
            <SuccessModal isOpen={succOpen} onClose={onSuccClose} successMessage={msg} />
        </div>
    );
}
