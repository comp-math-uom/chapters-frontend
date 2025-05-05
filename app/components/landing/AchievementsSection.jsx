"use client";
import React, {useEffect, useState} from "react";
import {Box, Container, Heading, SimpleGrid, Flex,} from "@chakra-ui/react";
import Image from "next/image";
import achievementService from "@/app/services/achivementService";
import AchievementCard from "@/app/components/landing/AchievementCard";

function AchievementsSection() {

    const [achievementPreviews, setAchievementPreviews] = useState([]);

    useEffect(() => {
        const fetchAchievementPreviews = async () => {
            const achievementPreviews= await achievementService.getAchievements();
            setAchievementPreviews(achievementPreviews);
        }

        fetchAchievementPreviews();
    }, []);

    return (
        <Box as="section" py={16} px={4} borderBottom="1px" borderColor="gray.200">
            <Container maxW="container.xl">
                <Flex direction="row" justify={'center'} align="flex-start" mb={10}>
                    <Heading as="h2" fontSize="6xl" fontWeight="bold" mb={6}>ACHIEVEMENTS</Heading>
                    <Box position="relative">
                        <Image
                            src="/img/achievements.png"
                            alt="Robot holding a trophy"
                            width={447}
                            height={281}
                            priority
                        />
                    </Box>
                </Flex>

                <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    spacing={6}
                >
                    {achievementPreviews.map((achievement) => (
                        <AchievementCard
                            key={achievement.id}
                            title={achievement.title}
                            subtitle={achievement.subtitle}
                            description={achievement.description}
                        />
                    ))}
                </SimpleGrid>

            </Container>
        </Box>
    );
}

export default AchievementsSection;