
"use client";
import React, {useEffect, useState} from "react";
import {Box, Container, Heading, SimpleGrid, Flex, Text} from "@chakra-ui/react";
import Image from "next/image";
import achievementService from "@/app/services/achivementService";
import AchievementCard from "@/app/components/landing/AchievementCard";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

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
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <Box as="section" py={{ base: 8, md: 16 }} px={4} borderBottom="1px" borderColor="gray.200">
                <Container maxW="container.xl">
                    <Flex direction={{ base: "column", md: "row" }} justify={'center'} align={{ base: "center", md: "flex-start" }} mb={{ base: 6, md: 10 }} gap={{ base: 4, md: 0 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-center md:text-left"
                        >
                            <Heading as="h2" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} fontWeight="bold" mb={6}>ACHIEVEMENTS</Heading>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                },
                                scale: { duration: 0.7 }
                            }}
                        >
                            <Box position="relative" className="max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0">
                                <Image
                                    src="/img/achievements.png"
                                    alt="Robot holding a trophy"
                                    width={447}
                                    height={281}
                                    className="w-full h-auto"
                                    priority
                                />
                            </Box>
                        </motion.div>
                    </Flex>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3 }}
                            spacing={{ base: 4, md: 6 }}
                        >
                            {achievementPreviews.map((achievement, index) => (
                                <motion.div
                                    key={achievement.id}
                                    variants={itemVariants}
                                    custom={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.15,
                                        duration: 0.5
                                    }}
                                >
                                    <AchievementCard
                                        title={achievement.title}
                                        subtitle={achievement.subtitle}
                                        description={achievement.description}
                                    />
                                </motion.div>
                            ))}
                        </SimpleGrid>
                    </motion.div>
                </Container>
            </Box>
        </motion.div>
    );
}

export default AchievementsSection;