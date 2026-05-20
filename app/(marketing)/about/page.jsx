"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Box, Container, Heading, Text, Image, SimpleGrid, Avatar, VStack, Button, HStack, Link as ChakraLink
} from "@chakra-ui/react";
import { useAuth } from "@/app/providers/Providers";
import { useNav } from "@/app/providers/NavigationProvider";
import aboutUsService from "@/app/lib/services/aboutUsService";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function AboutUsPage() {
    const router = useRouter();
    const { auth } = useAuth();
    const { setNavActionButton } = useNav();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isAdmin = auth?.role === "admin";

    useEffect(() => {
        (async () => {
            const result = await aboutUsService.get();
            setData(result);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            setNavActionButton({
                label: "Edit About",
                action: () => router.push('/about/edit'),
            });
        } else {
            setNavActionButton({ label: "", action: () => { } });
        }
        return () => setNavActionButton({ label: "", action: () => { } });
    }, [isAdmin, setNavActionButton, router]);

    if (isLoading) return <LoadingSpinner />;
    if (!data) return null;

    return (
        <Container maxW="6xl" py={12} px={{ base: 4, md: 6 }}>
            <VStack spacing={4} align="center" textAlign="center" mb={10}>
                <Heading as="h1" size="3xl" className="font-anton">
                    {data.hero_title || "About Chapters"}
                </Heading>
                <Text fontSize="lg" color="gray.600" maxW="2xl">
                    {data.hero_subtitle || "The AI Student Chapter"}
                </Text>
            </VStack>

            {data.cover_image && (
                <Box mb={10} borderRadius="lg" overflow="hidden" maxH="400px">
                    <Image src={data.cover_image} alt="About cover" w="full" objectFit="cover" />
                </Box>
            )}

            {data.body_markdown && (
                <Box
                    className="prose prose-lg max-w-none"
                    mb={12}
                    dangerouslySetInnerHTML={{ __html: data.body_markdown }}
                />
            )}

            {data.team?.length > 0 && (
                <Box mb={12}>
                    <Heading as="h2" size="lg" mb={6} className="font-anton">OUR TEAM</Heading>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
                        {data.team.map((member, idx) => (
                            <VStack key={idx} spacing={2}>
                                <Avatar src={member.image_url} name={member.name} size="xl" />
                                <Text fontWeight="bold">{member.name}</Text>
                                <Text fontSize="sm" color="gray.600">{member.role}</Text>
                            </VStack>
                        ))}
                    </SimpleGrid>
                </Box>
            )}

            <Box id="contactUS" bg="gray.50" p={8} borderRadius="lg">
                <Heading as="h2" size="lg" mb={4} className="font-anton">CONTACT US</Heading>
                {data.contact_email && (
                    <Text mb={2}>
                        <strong>Email:</strong>{" "}
                        <ChakraLink href={`mailto:${data.contact_email}`} color="blue.600">
                            {data.contact_email}
                        </ChakraLink>
                    </Text>
                )}
                {data.contact_links?.length > 0 && (
                    <HStack spacing={4} mt={3}>
                        {data.contact_links.map((url, idx) => (
                            <ChakraLink key={idx} href={url} isExternal color="blue.600">
                                {url}
                            </ChakraLink>
                        ))}
                    </HStack>
                )}
            </Box>
        </Container>
    );
}
