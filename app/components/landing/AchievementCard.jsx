"use client";
import React from "react";
import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { motion } from "framer-motion";

function AchievementCard({ title, subtitle, description, image, date, batch }) {
    const parsedDate = date ? new Date(date) : null;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ height: "100%" }}
        >
            <Box
                bg="white"
                borderRadius="md"
                overflow="hidden"
                boxShadow="sm"
                h="100%"
                display="flex"
                flexDirection="column"
            >
                <Box position="relative" w="100%" h="160px" bg="gray.100">
                    <Image
                        src={image || "/img/triathlon.png"}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </Box>
                <Box p={4} flex={1} display="flex" flexDirection="column">
                    <HStack mb={2} justify="space-between" flexWrap="wrap">
                        {subtitle && (
                            <Badge colorScheme="gray" textTransform="uppercase">
                                {subtitle}
                            </Badge>
                        )}
                        {parsedDate && (
                            <HStack spacing={1} color="gray.500" fontSize="xs">
                                <CalendarIcon boxSize={2.5} />
                                <Text>{parsedDate.toLocaleDateString()}</Text>
                            </HStack>
                        )}
                    </HStack>
                    <Text fontWeight="bold" fontSize="md" lineHeight="tight" noOfLines={2} mb={1}>
                        {title}
                    </Text>
                    {description && (
                        <Text fontSize="sm" color="gray.600" noOfLines={3}>
                            {description}
                        </Text>
                    )}
                    {batch && (
                        <Text fontSize="xs" color="gray.500" mt="auto" pt={2}>
                            <strong>Batch:</strong> {batch}
                        </Text>
                    )}
                </Box>
            </Box>
        </motion.div>
    );
}

export default AchievementCard;
