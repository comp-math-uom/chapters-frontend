"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AchievementForm from "@/app/components/portfolio/AchievementForm";
import achievementService from "@/app/lib/services/achievementService";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useAuth } from "@/app/providers/Providers";

export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const { auth, initialized } = useAuth();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errOpen, setErrOpen] = useState(false);
    const [succOpen, setSuccOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (!initialized) return;
        if (!auth?.authenticated) router.push('/auth/login');
        else if (auth.role !== 'admin') router.push('/portfolio/achievements');
    }, [initialized, auth, router]);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;
        (async () => {
            try {
                const data = await achievementService.fetchOne(id);
                if (!cancelled && data) {
                    setItem(data);
                }
            } catch (err) {
                console.error(err);
                setMsg("Failed to load achievement.");
                setErrOpen(true);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            const res = await achievementService.update(id, values);
            if (res.status === 200) {
                setMsg("Achievement updated!");
                setSuccOpen(true);
            } else {
                setMsg("Failed to update achievement.");
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

    if (isLoading || !initialized) return <LoadingSpinner />;
    if (!item) return null;

    return (
        <div className="container flex flex-col h-full m-auto justify-start px-4 sm:px-6 md:px-10 lg:px-20">
            <h1 className="text-3xl md:text-4xl font-bold my-6 md:my-10">Edit Achievement</h1>
            <AchievementForm initialValues={item} handleSubmit={handleSubmit} />
            <ErrorModal isOpen={errOpen} onClose={() => setErrOpen(false)} errorMessage={msg} />
            <SuccessModal isOpen={succOpen} onClose={onSuccClose} successMessage={msg} />
        </div>
    );
}
