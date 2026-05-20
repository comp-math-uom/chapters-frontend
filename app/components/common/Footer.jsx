"use client";

import {
    Box, Container, Divider, Flex, Grid, GridItem, Heading, HStack, Link as ChakraLink,
    Stack, Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiExternalLink, FiMail } from "react-icons/fi";

const UOM_AI_PROGRAMME_URL =
    "https://uom.lk/itfac/bachelor-science-honours-artificial-intelligence";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Box as="footer" bg="white" color="gray.700" borderTop="1px" borderColor="gray.200" mt="20">
            <Container maxW="7xl" px="4" py="12">
                <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap="8">
                    {/* Brand */}
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Stack spacing="3">
                            <Heading as="h3" fontSize="xl" color="black" fontWeight="bold" fontFamily="impact">
                                CHAPTERS
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                The student chapter of the BSc (Hons) in Artificial Intelligence
                                programme at the University of Moratuwa. Showcasing student
                                projects, achievements and writing.
                            </Text>
                            <ChakraLink
                                href={UOM_AI_PROGRAMME_URL}
                                isExternal
                                color="blue.600"
                                fontSize="sm"
                                _hover={{ textDecoration: "underline" }}
                            >
                                <HStack spacing={1}>
                                    <Text>About the BSc Hons AI programme at UoM</Text>
                                    <FiExternalLink />
                                </HStack>
                            </ChakraLink>
                        </Stack>
                    </GridItem>

                    {/* Explore */}
                    <GridItem>
                        <Stack spacing="3">
                            <Heading as="h4" fontSize="sm" color="black" fontWeight="bold" textTransform="uppercase">
                                Explore
                            </Heading>
                            <Stack spacing="2" fontSize="sm">
                                <Link href="/portfolio/projects" className="hover:underline">Projects</Link>
                                <Link href="/portfolio/achievements" className="hover:underline">Achievements</Link>
                                <Link href="/blog" className="hover:underline">Blog</Link>
                                <Link href="/about" className="hover:underline">About Us</Link>
                            </Stack>
                        </Stack>
                    </GridItem>

                    {/* Contact */}
                    <GridItem>
                        <Stack spacing="3">
                            <Heading as="h4" fontSize="sm" color="black" fontWeight="bold" textTransform="uppercase">
                                Contact
                            </Heading>
                            <Stack spacing="2" fontSize="sm" color="gray.600">
                                <HStack spacing={2}>
                                    <FiMail />
                                    <ChakraLink href="mailto:aichapter@uom.lk" _hover={{ color: "gray.900" }}>
                                        aichapter@uom.lk
                                    </ChakraLink>
                                </HStack>
                                <Text>Faculty of IT,</Text>
                                <Text>University of Moratuwa,</Text>
                                <Text>Sri Lanka</Text>
                                <Link href="/about#contactUS" className="hover:underline mt-1">
                                    Contact form →
                                </Link>
                            </Stack>
                        </Stack>
                    </GridItem>
                </Grid>

                <Divider mt="10" borderColor="gray.200" />
                <Flex
                    mt="6"
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between"
                    align="center"
                    gap={2}
                >
                    <Text fontSize="xs" color="gray.500">
                        &copy; {year} CHAPTERS — AI Student Chapter, University of Moratuwa. All rights reserved.
                    </Text>
                    <ChakraLink
                        href={UOM_AI_PROGRAMME_URL}
                        isExternal
                        fontSize="xs"
                        color="gray.500"
                        _hover={{ color: "gray.800" }}
                    >
                        uom.lk/itfac/bachelor-science-honours-artificial-intelligence
                    </ChakraLink>
                </Flex>
            </Container>
        </Box>
    );
}
