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
            p={6}
            position="relative"
            overflow="hidden"
        >
            <Flex direction="column" h="100%">
                <Flex justify="space-between" align="center" mb={4}>
                    <Box>
                        <Text fontWeight="bold" fontSize="lg">{title}</Text>
                        <Text fontSize="md" color="gray.600">{subtitle}</Text>
                    </Box>
                    <Box position="relative" width="40px" height="40px">
                        <Image
                            src="/img/triathlon.png"
                            alt="Biohazard icon"
                            layout="fill"
                            objectFit="contain"
                        />
                    </Box>
                </Flex>
                <Text fontSize="sm" color="gray.600">
                    {description}
                </Text>
            </Flex>
        </Box>
            </motion.div>
    );
}

export default AchievementCard;
