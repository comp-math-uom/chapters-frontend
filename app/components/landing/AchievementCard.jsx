"use client";
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";

function AchievementCard({ title, subtitle, description }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Box
                borderWidth="1px"
                borderRadius="md"
                borderColor="gray.800"
                p={{ base: 4, sm: 5, md: 6 }}
                position="relative"
                overflow="hidden"
                h="100%"
            >
                <Flex direction="column" h="100%">
                    <Flex
                        justify="space-between"
                        align={{ base: "flex-start", sm: "center" }}
                        mb={4}
                        direction={{ base: "column", sm: "row" }}
                        gap={{ base: 2, sm: 0 }}
                    >
                        <Box>
                            <Text fontWeight="bold" fontSize={{ base: "md", sm: "lg" }} lineHeight="tight">{title}</Text>
                            <Text fontSize={{ base: "sm", sm: "md" }} color="gray.600">{subtitle}</Text>
                        </Box>
                        <Box
                            position="relative"
                            width={{ base: "32px", sm: "36px", md: "40px" }}
                            height={{ base: "32px", sm: "36px", md: "40px" }}
                            flexShrink={0}
                        >
                            <Image
                                src="/img/triathlon.png"
                                alt="Achievement icon"
                                layout="fill"
                                objectFit="contain"
                            />
                        </Box>
                    </Flex>
                    <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.600">
                        {description}
                    </Text>
                </Flex>
            </Box>
        </motion.div>
    );
}

export default AchievementCard;