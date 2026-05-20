"use client";

import { Badge, Box, Heading, HStack, Image, Text, Flex } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

export default function AchievementCard({ achievement, onClick }) {
    const date = achievement.date ? new Date(achievement.date) : null;
    return (
        <Box
            bg="white"
            borderRadius="md"
            overflow="hidden"
            boxShadow="sm"
            transition="all 0.2s"
            cursor="pointer"
            onClick={onClick}
            _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
            h="100%"
            display="flex"
            flexDirection="column"
        >
            <Box position="relative" bg="gray.50">
                <Image
                    src={achievement.image}
                    alt={achievement.title}
                    objectFit="cover"
                    w="100%"
                    h="200px"
                />
                <Flex position="absolute" top={2} right={2} gap={1}>
                    {achievement.featured && (
                        <Badge colorScheme="yellow" variant="solid">FEATURED</Badge>
                    )}
                    {achievement.visible === false && (
                        <Badge colorScheme="red" variant="solid">HIDDEN</Badge>
                    )}
                </Flex>
            </Box>
            <Box p={4} flex={1} display="flex" flexDirection="column">
                <HStack mb={2} justify="space-between" flexWrap="wrap">
                    <Badge colorScheme="gray" textTransform="uppercase">
                        {achievement.category}
                    </Badge>
                    {date && (
                        <HStack spacing={1} color="gray.500" fontSize="xs">
                            <CalendarIcon boxSize={2.5} />
                            <Text>{date.toLocaleDateString()}</Text>
                        </HStack>
                    )}
                </HStack>
                <Heading as="h3" size="md" mb={2} noOfLines={2}>
                    {achievement.title}
                </Heading>
                {achievement.description && (
                    <Text color="gray.600" fontSize="sm" noOfLines={3} mb={3}>
                        {achievement.description}
                    </Text>
                )}
                <Box mt="auto">
                    {achievement.recipients?.length > 0 && (
                        <Text fontSize="xs" color="gray.500" noOfLines={1} mb={1}>
                            <strong>Recipients:</strong> {achievement.recipients.join(", ")}
                        </Text>
                    )}
                    {achievement.batch && (
                        <Text fontSize="xs" color="gray.500">
                            <strong>Batch:</strong> {achievement.batch}
                        </Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
