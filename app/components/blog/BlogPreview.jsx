"use client";

import { Avatar, Box, Card, CardBody, CardFooter, Flex, Heading, Image, Tooltip } from "@chakra-ui/react";
import Link from "next/link";


export default function BlogPreview({ blogPreview }) {
    // Build the author display name from first + last, falling back to whatever
    // the backend gave us. Avatar `name` prop drives the initials fallback.
    const authorName = `${blogPreview.user_first_name || ""} ${blogPreview.user_last_name || ""}`.trim()
        || blogPreview.user_display_name
        || blogPreview.user_username
        || "Author";

    return (
        <Link href={`/blog/${blogPreview.blog_id || blogPreview.blogPost_id}`} className="block w-full sm:max-w-sm">
            <Card
                maxW={['100%', 'sm']}
                className="mt-10"
                boxShadow='md'
                cursor="pointer"
                transition="all 0.3s ease-in-out"
                _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "2xl",
                    borderColor: "gray.200"
                }}
                border="1px"
                borderColor="transparent"
                h="100%"
            >
                {blogPreview.post_image && (
                    <Image
                        height="240px"
                        objectFit="cover"
                        borderTopRadius="md"
                        src={blogPreview.post_image}
                        alt={blogPreview.title}
                        transition="all 0.3s ease-in-out"
                    />
                )}
                <CardBody>
                    <Heading as='h4' size='md' noOfLines={3}>
                        {blogPreview.title}
                    </Heading>
                </CardBody>

                <CardFooter pt={0}>
                    <Flex gap='3' alignItems='center'>
                        <Tooltip label={authorName} hasArrow borderRadius="md">
                            <Avatar
                                name={authorName}
                                src={blogPreview.user_image_url || blogPreview.user_image}
                                size="sm"
                            />
                        </Tooltip>
                        <Box fontSize="sm" color="gray.600" noOfLines={1}>
                            {authorName}
                        </Box>
                    </Flex>
                </CardFooter>
            </Card>
        </Link>
    );
}
