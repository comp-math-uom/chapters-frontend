'use client';

import BlogEditor from "@/app/components/blog/BlogEditor";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import BlogSettingsForm from "@/app/components/blog/BlogSettingsForm";
import { useNav } from "@/app/providers/NavigationProvider";
import { BlogProvider } from "@/app/providers/BlogProvider";

export default function Page() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {setNavActionButton} = useNav();

    useEffect(() => {
        setNavActionButton(
            {
                label: 'Publish',
                action: onOpen
            }
        );
    }, [onOpen, setNavActionButton]);

    return (
        <BlogProvider>
            <Drawer isOpen={isOpen} size="md" onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader>Blog Settings</DrawerHeader>
                    <DrawerBody>
                        <BlogSettingsForm handleCancel={onClose}/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <div className="container flex flex-wrap justify-center m-auto px-4 md:px-8 lg:px-20 xl:px-32 gap-4 md:gap-10 lg:gap-20 mt-8 md:mt-12 lg:mt-20">
                <BlogEditor/>
            </div>
        </BlogProvider>
    );
}