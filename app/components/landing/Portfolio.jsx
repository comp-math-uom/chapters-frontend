"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Heading, SimpleGrid, Text, Image as ChakraImage } from "@chakra-ui/react";
import portfolioService from "@/app/lib/services/portfolioService";

function Portfolio() {
    const [featured, setFeatured] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            // Featured + visible only — backend handles visibility filtering.
            const items = await portfolioService.fetchGalleryItems(true);
            setFeatured(items.slice(0, 6));
            setIsLoading(false);
        })();
    }, []);

    return (
        <section className="flex flex-col items-center justify-center text-center py-8 md:py-12 px-4">
            <motion.div
                className="max-w-6xl w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="overflow-hidden"
                >
                    <Image
                        src={'/img/portfolio.png'}
                        alt="Portfolio Illustration"
                        width={1081}
                        height={381}
                        className="mx-auto w-full h-auto"
                    />
                </motion.div>

                <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 mt-4 md:mt-0">
                    <motion.div
                        className="w-full md:w-2/5 flex flex-col text-center md:text-right"
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full font-black mt-2 md:mt-6">
                            PROJECTS
                        </h1>
                    </motion.div>
                    <motion.div
                        className="w-full md:w-3/5 flex flex-col"
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <p className="mt-2 md:mt-4 text-base md:text-lg text-gray-700 text-center md:text-left">
                            Explore the results of our learning. This portfolio presents a diverse collection of
                            projects by University of Moratuwa AI students, ranging from in-depth research to practical
                            applications.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/portfolio/projects">
                                    <button className="mt-4 md:mt-6 inline-block border-2 border-black px-4 sm:px-6 py-2 font-bold rounded-full hover:bg-black hover:text-white transition">
                                        BROWSE PROJECTS
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {!isLoading && featured.length > 0 && (
                    <Box mt={{ base: 8, md: 12 }}>
                        <Heading
                            as="h3"
                            fontSize={{ base: "lg", md: "xl" }}
                            mb={4}
                            textAlign="left"
                            color="gray.700"
                        >
                            FEATURED PROJECTS
                        </Heading>
                        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
                            {featured.map((project) => (
                                <Link key={project.id} href="/portfolio/projects" style={{ display: "block" }}>
                                    <Box
                                        borderRadius="md"
                                        overflow="hidden"
                                        bg="white"
                                        boxShadow="sm"
                                        _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                                        transition="all 0.2s"
                                        h="100%"
                                    >
                                        <ChakraImage
                                            src={project.image}
                                            alt={project.topic}
                                            w="100%"
                                            h="160px"
                                            objectFit="cover"
                                        />
                                        <Box p={3} textAlign="left">
                                            <Text fontWeight="bold" fontSize="sm" noOfLines={2}>
                                                {project.topic}
                                            </Text>
                                            {project.batch && (
                                                <Text fontSize="xs" color="gray.500" mt={1}>
                                                    {project.batch}
                                                </Text>
                                            )}
                                        </Box>
                                    </Box>
                                </Link>
                            ))}
                        </SimpleGrid>
                    </Box>
                )}
            </motion.div>
        </section>
    );
}

export default Portfolio;
