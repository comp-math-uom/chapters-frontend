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
                borderRadius="xl"
                overflow="hidden"
                border="1px solid"
                borderColor="slate.100"
                boxShadow="card"
                _hover={{ boxShadow: "card-hover" }}
                transition="box-shadow 0.2s"
                h="100%"
                display="flex"
                flexDirection="column"
            >
                <Box position="relative" w="100%" h="160px" bg="slate.100">
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
                            <Badge colorScheme="primary" borderRadius="full" px={2} textTransform="uppercase">
                                {subtitle}
                            </Badge>
                        )}
                        {parsedDate && (
                            <HStack spacing={1} color="slate.500" fontSize="xs">
                                <CalendarIcon boxSize={2.5} />
                                <Text>{parsedDate.toLocaleDateString()}</Text>
                            </HStack>
                        )}
                    </HStack>
                    <Text fontWeight="bold" fontSize="md" lineHeight="tight" noOfLines={2} mb={1} color="slate.900">
                        {title}
                    </Text>
                    {description && (
                        <Text fontSize="sm" color="slate.600" noOfLines={3}>
                            {description}
                        </Text>
                    )}
                    {batch && (
                        <Text fontSize="xs" color="slate.500" mt="auto" pt={2}>
                            <strong>Batch:</strong> {batch}
                        </Text>
                    )}
                </Box>
            </Box>
        </motion.div>
    );
}

export default AchievementCard;
