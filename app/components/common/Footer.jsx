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
        <Box as="footer" bg="slate.50" color="slate.700" borderTop="1px" borderColor="slate.200" mt="20">
            <Container maxW="7xl" px="4" pt="14" pb="6">
                <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap="10">
                    {/* Brand */}
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <Stack spacing="3">
                            <Heading as="h3" fontSize="xl" color="slate.900" fontWeight="bold" fontFamily="Impact, sans-serif">
                                CHAPTERS
                            </Heading>
                            <Text fontSize="sm" color="slate.600" maxW="sm">
                                The student chapter of the BSc (Hons) in Artificial Intelligence
                                programme at the University of Moratuwa. Showcasing student
                                projects, achievements and writing.
                            </Text>
                            <ChakraLink
                                href={UOM_AI_PROGRAMME_URL}
                                isExternal
                                color="primary.600"
                                fontSize="sm"
                                fontWeight="medium"
                                _hover={{ color: "primary.700", textDecoration: "underline" }}
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
                            <Heading as="h4" fontSize="xs" color="slate.900" fontWeight="bold" letterSpacing="wider" textTransform="uppercase">
                                Explore
                            </Heading>
                            <Stack spacing="2" fontSize="sm" color="slate.600">
                                <Link href="/portfolio/projects" className="w-fit transition-colors hover:text-primary-600">Projects</Link>
                                <Link href="/portfolio/achievements" className="w-fit transition-colors hover:text-primary-600">Achievements</Link>
                                <Link href="/blog" className="w-fit transition-colors hover:text-primary-600">Blog</Link>
                                <Link href="/about" className="w-fit transition-colors hover:text-primary-600">About Us</Link>
                            </Stack>
                        </Stack>
                    </GridItem>

                    {/* Contact */}
                    <GridItem>
                        <Stack spacing="3">
                            <Heading as="h4" fontSize="xs" color="slate.900" fontWeight="bold" letterSpacing="wider" textTransform="uppercase">
                                Contact
                            </Heading>
                            <Stack spacing="2" fontSize="sm" color="slate.600">
                                <HStack spacing={2}>
                                    <FiMail />
                                    <ChakraLink href="mailto:aistudentchapter@uom.lk" _hover={{ color: "primary.600" }}>
                                        aistudentchapter@uom.lk
                                    </ChakraLink>
                                </HStack>
                                <Text>Faculty of IT,</Text>
                                <Text>University of Moratuwa,</Text>
                                <Text>Sri Lanka</Text>
                            </Stack>
                        </Stack>
                    </GridItem>
                </Grid>

                <Divider mt="10" borderColor="slate.200" />
                <Flex
                    mt="6"
                    direction={{ base: "column", sm: "row" }}
                    justify="center"
                    align="center"
                    gap={2}
                >
                    <Text fontSize="xs" color="slate.500">
                        &copy; {year} CHAPTERS, AI Student Chapter, University of Moratuwa. All rights reserved.
                    </Text>
                </Flex>
            </Container>
        </Box>
    );
}
