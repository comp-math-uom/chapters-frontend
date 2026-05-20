"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Heading, Text, VStack, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import achievementService from "@/app/lib/services/achievementService";
import AchievementCard from "@/app/components/portfolio/AchievementCard";
import AchievementModal from "@/app/components/portfolio/AchievementModal";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorBlock from "@/app/components/common/ErrorBlock";
import NoSearchResults from "@/app/components/portfolio/NoResult";
import Pagination from "@/app/components/common/Pagination";
import { useAuth } from "@/app/providers/Providers";
import { useNav } from "@/app/providers/NavigationProvider";

const PAGE_SIZE = 9;

export default function AchievementsPage() {
    const router = useRouter();
    const { auth, initialized } = useAuth();
    const { setNavActionButton } = useNav();
    const isAdmin = auth?.role === "admin";

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selected, setSelected] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const loadPage = async (pageToLoad = 1) => {
        setIsLoading(true);
        setIsError(false);
        try {
            const result = await achievementService.fetchPage({ page: pageToLoad, limit: PAGE_SIZE });
            setItems(result.items);
            setTotal(result.total);
            setPage(result.page);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialized) loadPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, isAdmin]);

    useEffect(() => {
        if (isAdmin) {
            setNavActionButton({
                label: "+ New Achievement",
                action: () => router.push("/portfolio/achievements/add-item"),
            });
        } else {
            setNavActionButton({ label: "", action: () => { } });
        }
        return () => setNavActionButton({ label: "", action: () => { } });
    }, [isAdmin, setNavActionButton, router]);

    const handleOpen = (achievement) => {
        setSelected(achievement);
        onOpen();
    };

    const handleClose = () => {
        onClose();
        setSelected(null);
    };

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <div className="container flex flex-col justify-center m-auto px-4 sm:px-6 md:px-10 lg:px-20">
            <Box width="full" py={16}>
                <VStack spacing={6} align="center">
                    <Box maxW="2xl" textAlign="center">
                        <Heading as="h1" size="4xl" fontWeight="bold" className="font-anton">
                            ACHIEVEMENTS
                        </Heading>
                        <Text mt={4} fontSize="lg" color="gray.500" className="font-anybody">
                            Awards, competition wins and recognitions earned by the chapter.
                        </Text>
                    </Box>
                </VStack>
            </Box>

            {isLoading && <LoadingSpinner />}
            {isError && !isLoading && <ErrorBlock msg="We could not load achievements. Please try again later." />}
            {!isLoading && !isError && items.length === 0 && <NoSearchResults onClear={() => loadPage(1)} />}
            {!isLoading && !isError && items.length > 0 && (
                <>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} pb={4}>
                        {items.map((a) => (
                            <AchievementCard key={a.id} achievement={a} onClick={() => handleOpen(a)} />
                        ))}
                    </SimpleGrid>
                    <Pagination page={page} totalPages={totalPages} onChange={loadPage} />
                </>
            )}

            <AchievementModal
                isOpen={isOpen}
                onClose={handleClose}
                achievement={selected}
                onDeleted={() => loadPage(page)}
            />
        </div>
    );
}
