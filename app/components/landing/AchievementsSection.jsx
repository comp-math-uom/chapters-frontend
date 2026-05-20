"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Heading, SimpleGrid, Flex, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import achievementService from "@/app/lib/services/achievementService";
import AchievementCard from "@/app/components/landing/AchievementCard";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function AchievementsSection() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // Landing page = featured only. Backend filters visibility automatically.
            const data = await achievementService.fetchAll(true);
            setItems(data.slice(0, 6));
            setIsLoading(false);
        })();
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
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        justify="center"
                        align={{ base: "center", md: "flex-start" }}
                        mb={{ base: 6, md: 10 }}
                        gap={{ base: 4, md: 0 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-center md:text-left"
                        >
                            <Heading as="h2" fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }} fontWeight="bold" mb={6}>
                                ACHIEVEMENTS
                            </Heading>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            animate={{ y: [0, -15, 0] }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                                scale: { duration: 0.7 },
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

                    {isLoading ? (
                        <Text textAlign="center" color="gray.500">Loading featured achievements…</Text>
                    ) : items.length === 0 ? (
                        <Text textAlign="center" color="gray.500">
                            No featured achievements yet. Check back soon.
                        </Text>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 6 }}>
                                {items.map((achievement) => (
                                    <motion.div key={achievement.id} variants={itemVariants}>
                                        <AchievementCard
                                            title={achievement.title}
                                            subtitle={achievement.category}
                                            description={achievement.description}
                                            image={achievement.image}
                                        />
                                    </motion.div>
                                ))}
                            </SimpleGrid>
                        </motion.div>
                    )}

                    <Flex justify="center" mt={8}>
                        <Link href="/portfolio/achievements">
                            <Button
                                variant="outline"
                                borderColor="black"
                                _hover={{ bg: "black", color: "white" }}
                                borderRadius="full"
                                px={6}
                            >
                                SEE ALL ACHIEVEMENTS
                            </Button>
                        </Link>
                    </Flex>
                </Container>
            </Box>
        </motion.div>
    );
}

export default AchievementsSection;
