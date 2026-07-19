"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import blogService from "@/app/lib/services/blogService";
import { useAuth } from "@/app/providers/Providers";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorBlock from "@/app/components/common/ErrorBlock";

export default function BlogAdminPage() {
    const { auth, initialized } = useAuth();
    const router = useRouter();
    const toast = useToast();
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (initialized && !auth?.isAdmin) {
            router.push("/");
        }
    }, [initialized, auth, router]);

    const loadBlogs = async () => {
        try {
            setIsLoading(true);
            const data = await blogService.getAdminBlogs("pending");
            setBlogs(data || []);
        } catch (error) {
            console.error("Failed to load pending blogs:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialized && auth?.isAdmin) {
            loadBlogs();
        }
    }, [initialized, auth]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await blogService.updateBlogStatus(id, status);
            setBlogs((prev) => prev.filter((blog) => blog.blog_id !== id));
            toast({
                title: `Blog ${status}`,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Action failed",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await blogService.deleteBlog(id);
            setBlogs((prev) => prev.filter((blog) => blog.blog_id !== id));
            toast({
                title: "Blog deleted",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Delete failed",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-20 mt-8">
                <LoadingSpinner text="Loading pending blogs..." />
            </div>
        );
    }

    if (isError) {
        return <ErrorBlock msg="We could not load pending blogs. Please try again." />;
    }

    return (
        <div className="container mx-auto px-4 md:px-8 lg:px-20 mt-8">
            <Heading size="lg" mb={6}>Pending Blog Submissions</Heading>
            {blogs.length === 0 ? (
                <Text color="gray.600">No pending blogs.</Text>
            ) : (
                <Stack spacing={4}>
                    {blogs.map((blog) => (
                        <Box key={blog.blog_id} borderWidth="1px" borderRadius="lg" p={4}>
                            <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={4}>
                                <Box>
                                    <Heading size="md" mb={2}>{blog.title}</Heading>
                                    <Text color="gray.600" mb={2}>{blog.content_preview}</Text>
                                    <Text fontSize="sm" color="gray.500">
                                        Author: {[blog.user_first_name, blog.user_last_name].filter(Boolean).join(" ") || blog.user_username || "Student"}
                                    </Text>
                                </Box>
                                <HStack spacing={3} alignSelf={{ base: "flex-start", md: "center" }}>
                                    <Button size="sm" colorScheme="green" onClick={() => handleStatusUpdate(blog.blog_id, "approved")}>Approve</Button>
                                    <Button size="sm" colorScheme="yellow" onClick={() => handleStatusUpdate(blog.blog_id, "rejected")}>Reject</Button>
                                    <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleDelete(blog.blog_id)}>Delete</Button>
                                </HStack>
                            </Flex>
                        </Box>
                    ))}
                </Stack>
            )}
        </div>
    );
}
