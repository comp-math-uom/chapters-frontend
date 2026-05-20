"use client";
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";

function AchievementCard({ title, subtitle, description, image }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ height: "100%" }}
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
                            <Text fontWeight="bold" fontSize={{ base: "md", sm: "lg" }} lineHeight="tight" noOfLines={2}>
                                {title}
                            </Text>
                            {subtitle && (
                                <Text fontSize={{ base: "sm", sm: "md" }} color="gray.600" textTransform="uppercase">
                                    {subtitle}
                                </Text>
                            )}
                        </Box>
                        <Box
                            position="relative"
                            width={{ base: "48px", sm: "56px", md: "64px" }}
                            height={{ base: "48px", sm: "56px", md: "64px" }}
                            flexShrink={0}
                            borderRadius="md"
                            overflow="hidden"
                            bg="gray.100"
                        >
                            <Image
                                src={image || "/img/triathlon.png"}
                                alt="Achievement"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                    </Flex>
                    {description && (
                        <Text fontSize={{ base: "xs", sm: "sm" }} color="gray.600" noOfLines={3}>
                            {description}
                        </Text>
                    )}
                </Flex>
            </Box>
        </motion.div>
    );
}

export default AchievementCard;