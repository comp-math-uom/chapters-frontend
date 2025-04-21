"use client";

import { Box, Button, Container, Divider, Flex, Grid, GridItem, Heading, Input, Stack, Text } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box as="footer" bg="white" color="gray.700" borderTop="1px" borderColor="gray.200" mt="20">
            <Container maxW="7xl" px="4" py="12">
                {/* Main Footer Content */}
                <Grid templateColumns={{base: "1fr", md: "repeat(2, 1fr)"}} gap="8">
                    {/* Brand Section */}
                    <GridItem>
                        <Stack spacing="4">
                            <Heading as="h3" fontSize="xl" color="black" fontWeight="bold">
                                CHAPTERS
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                Capturing adventures and sharing stories from the great outdoors.
                            </Text>
                        </Stack>
                    </GridItem>

                    {/* Newsletter */}
                    <GridItem>
                        <Stack spacing="4">
                            <Heading as="h4" fontSize="lg" color="black" fontWeight="semibold">
                                Stay Updated
                            </Heading>
                            <Text fontSize="sm" color="gray.600">
                                Subscribe to our newsletter for the latest updates and stories.
                            </Text>
                            <Flex gap="2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    size="md"
                                    fontSize="sm"
                                    focusBorderColor="gray.400"
                                    borderRadius="lg"
                                />
                                <Button
                                    bg="black"
                                    color="white"
                                    _hover={{bg: "gray.800"}}
                                    size="md"
                                    fontSize="sm"
                                    borderRadius="lg"
                                    px="4"
                                >
                                    Subscribe
                                </Button>
                            </Flex>
                        </Stack>
                    </GridItem>
                </Grid>

                {/* Bottom Bar */}
                <Divider mt="12" borderColor="gray.200"/>
                <Text
                    textAlign="center"
                    fontSize="sm"
                    color="gray.600"
                    mt="8"
                >
                    &copy; {new Date().getFullYear()} CHAPTERS. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
}