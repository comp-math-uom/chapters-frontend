"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Avatar, Button, Menu, MenuButton, MenuItem, MenuList, IconButton, Drawer,
    DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure,
    VStack, HStack
} from "@chakra-ui/react";
import { FiLogOut, FiUser, FiMenu } from "react-icons/fi";
import { useNav } from "@/app/providers/NavigationProvider";
import { useKeycloak } from '@/app/providers/Providers';
import { useRouter } from "next/navigation";

function Navbar() {
    const { keycloak, initialized } = useKeycloak();
    const [profilePic, setProfilePic] = useState();
    const { navActionButton } = useNav();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    // Debug logs
    useEffect(() => {
        console.log('Keycloak:', keycloak);
        console.log('Token parsed:', keycloak?.tokenParsed);
        console.log('Authenticated:', keycloak?.authenticated);
    }, [keycloak]);

    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contactUS');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            onClose(); // Close mobile menu if open
        }
    };

    useEffect(() => {
        // Check if window exists (client-side)
        if (typeof window !== 'undefined') {
            // Set initial state based on viewport width
            setIsMobile(window.innerWidth < 1024);

            // Add resize listener
            const handleResize = () => {
                setIsMobile(window.innerWidth < 1024);
            };

            window.addEventListener('resize', handleResize);

            // Clean up
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        setProfilePic(keycloak?.tokenParsed?.picture);
    }, [keycloak]);

    const onLogout = () => {
        keycloak.logout().then(() => {
            console.log('Logged out successfully');
            router.push('/');
        }).catch((error) => {
            console.error('Logout failed:', error);
        });
    };

    const NavLinks = () => (
        <>
            <Link passHref href="/portfolio" className="font-impact hover:text-gray-700">PORTFOLIO</Link>
            <Link passHref href="/blog" className="font-impact hover:text-gray-700">BLOG</Link>
            <Link passHref href="/forum" className="font-impact hover:text-gray-700">FORUM</Link>
            <Link passHref href="/#contactUs" className="font-impact hover:text-gray-700" onClick={scrollToContact}>CONTACT US</Link>
        </>
    );

    return (
        <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 container mx-auto">
                <div className="ml-0 sm:ml-4 md:ml-14">
                    <Link href="/" passHref>
                        <h1 className="m-0 text-xl ml-4 md:ml-0 sm:text-2xl md:text-3xl font-impact cursor-pointer">CHAPTERS</h1>
                    </Link>
                </div>

                {!isMobile && (
                    <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                        <NavLinks />
                    </div>
                )}

                <div className="flex items-center gap-2 sm:gap-5">
                    {!isMobile && navActionButton.label !== "" && (
                        <Button variant="ghost" onClick={navActionButton.action}>
                            {navActionButton.label}
                        </Button>
                    )}

                    {initialized && keycloak && keycloak.authenticated ? (
                        <div className="flex items-center gap-2">
                            <p className="text-base text-black text-decoration-none hidden sm:block">
                                {keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email || JSON.stringify(keycloak.tokenParsed) || 'User'}
                            </p>
                            <Menu placement="bottom-end">
                                <MenuButton>
                                    <Avatar
                                        src={profilePic}
                                        alt={keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}
                                        name={keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}
                                        size={{ base: "sm", md: "md" }}
                                        cursor="pointer"
                                        _hover={{ opacity: 0.8 }}
                                    />
                                </MenuButton>
                                <MenuList minW="200px">
                                    <MenuItem icon={<FiUser />}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem icon={<FiLogOut />} onClick={onLogout}>
                                        Sign out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    ) : (
                        <Button
                            bg="black"
                            color="white"
                            size="md"
                            fontWeight="semibold"
                            borderRadius="lg"
                            onClick={() => keycloak && keycloak.login()}
                            _hover={{ bg: "gray.700" }}
                        >
                            Sign In
                        </Button>
                    )}

                    {isMobile && (
                        <IconButton
                            aria-label="Open menu"
                            icon={<FiMenu />}
                            variant="ghost"
                            onClick={onOpen}
                        />
                    )}
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerBody mt={10}>
                        <VStack spacing={6} align="flex-start">
                            <NavLinks />

                            {navActionButton.label !== "" && (
                                <Button variant="ghost" onClick={() => {
                                    onClose();
                                    navActionButton.action();
                                }}>
                                    {navActionButton.label}
                                </Button>
                            )}

                            {!initialized || !keycloak || !keycloak.authenticated ? (
                                <HStack spacing={4} pt={4} w="full">
                                    <Button
                                        bg="black"
                                        color="white"
                                        size="md"
                                        fontWeight="semibold"
                                        borderRadius="lg"
                                        onClick={() => keycloak && keycloak.login()}
                                        _hover={{ bg: "gray.700" }}
                                    >
                                        Sign In
                                    </Button>
                                    <span>|</span>
                                    <Link href="auth/signup" className="hover:underline">Sign Up</Link>
                                </HStack>
                            ) : (
                                <HStack spacing={4} pt={4} w="full">
                                    <p className="text-base text-black text-decoration-none hidden sm:block">
                                        {keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}
                                    </p>
                                    <Menu placement="bottom-end">
                                        <MenuButton>
                                            <Avatar
                                                src={profilePic}
                                                alt={keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}
                                                name={keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email}
                                                size={{ base: "sm", md: "md" }}
                                                cursor="pointer"
                                                _hover={{ opacity: 0.8 }}
                                            />
                                        </MenuButton>
                                        <MenuList minW="200px">
                                            <MenuItem icon={<FiUser />}>
                                                Profile
                                            </MenuItem>
                                            <MenuItem icon={<FiLogOut />} onClick={() => keycloak.logout()}>
                                                Sign out
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </HStack>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <hr />
        </div>
    );
}

export default Navbar;