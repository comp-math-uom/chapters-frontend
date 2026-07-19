"use client";

import { Badge, Box, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";

export default function ProjectCard({ project, onClick }) {
    const date = project.date ? new Date(project.date) : null;
    const contributorNames = (project.contributors || [])
        .map((c) => (typeof c === "string" ? c : c?.name))
        .filter(Boolean);

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
                    src={project.image}
                    alt={project.topic}
                    objectFit="cover"
                    w="100%"
                    h="200px"
                />
                <Flex position="absolute" top={2} right={2} gap={1}>
                    {project.featured && (
                        <Badge colorScheme="yellow" variant="solid">FEATURED</Badge>
                    )}
                    {project.visible === false && (
                        <Badge colorScheme="red" variant="solid">HIDDEN</Badge>
                    )}
                </Flex>
            </Box>
            <Box p={4} flex={1} display="flex" flexDirection="column">
                <HStack mb={2} justify="space-between" flexWrap="wrap">
                    {project.batch && (
                        <Badge colorScheme="gray" textTransform="uppercase">
                            {project.batch}
                        </Badge>
                    )}
                    {date && (
                        <HStack spacing={1} color="gray.500" fontSize="xs">
                            <CalendarIcon boxSize={2.5} />
                            <Text>{date.toLocaleDateString()}</Text>
                        </HStack>
                    )}
                </HStack>
                <Heading as="h3" size="md" mb={2} noOfLines={2}>
                    {project.topic}
                </Heading>
                {project.description && (
                    <Text color="gray.600" fontSize="sm" noOfLines={3} mb={3}>
                        {project.description}
                    </Text>
                )}
                {contributorNames.length > 0 && (
                    <Text fontSize="xs" color="gray.500" noOfLines={1} mt="auto">
                        <strong>Contributors:</strong> {contributorNames.join(", ")}
                    </Text>
                )}
            </Box>
        </Box>
    );
}
