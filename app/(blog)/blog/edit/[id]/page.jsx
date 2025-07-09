"use client";

import React, { useEffect, useState } from "react";
import BlogEditor from "@/app/components/blog/BlogEditor";
import BlogSettingsForm from "@/app/components/blog/BlogSettingsForm";
import blogService from "@/app/lib/services/blogService";
import { useNav } from "@/app/providers/NavigationProvider";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { BlogProvider, useBlog } from "@/app/providers/BlogProvider";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { notFound } from 'next/navigation';

function EditBlogContent({ params }) {
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFoundError, setNotFoundError] = useState(false);
    const { setNavActionButton } = useNav();
    const { initializeBlogData } = useBlog();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true);
                const blogData = await blogService.getBlogByIdFromAPI(params.id);
                console.log("Fetched blog data for editing:", blogData);

                if (!blogData) {
                    setNotFoundError(true);
                } else {
                    setBlog(blogData);
                    // Initialize the blog context with existing data
                    initializeBlogData(blogData);
                }
            } catch (error) {
                console.error("Error fetching blog for editing:", error);
                setNotFoundError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [params.id]); // Removed initializeBlogData from dependencies

    useEffect(() => {
        setNavActionButton({
            label: 'Update',
            action: onOpen
        });

        return () => setNavActionButton({
            label: '',
            action: () => {}
        });
    }, [onOpen, setNavActionButton]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 md:px-8 lg:px-20 xl:px-40 2xl:px-60 mt-8">
                <LoadingSpinner text="Loading blog for editing..." />
            </div>
        );
    }

    if (notFoundError || !blog) {
        return notFound();
    }

    return (
        <>
            <Drawer isOpen={isOpen} size="md" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Update Blog Settings</DrawerHeader>
                    <DrawerBody>
                        <BlogSettingsForm 
                            initialValues={{
                                tags: blog.tags || [],
                                image: blog.post_image || null,
                                user_id: blog.user_id || "",
                            }}
                            handleCancel={onClose}
                            isEditMode={true}
                            blogId={params.id}
                        />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <div className="container flex flex-wrap justify-center m-auto px-4 md:px-8 lg:px-20 xl:px-32 gap-4 md:gap-10 lg:gap-20 mt-8 md:mt-12 lg:mt-20">
                <BlogEditor />
            </div>
        </>
    );
}

export default function EditBlogPage({ params }) {
    return (
        <BlogProvider>
            <EditBlogContent params={params} />
        </BlogProvider>
    );
}