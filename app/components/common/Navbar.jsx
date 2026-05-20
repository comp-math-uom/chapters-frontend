"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
    Avatar, Button, Menu, MenuButton, MenuItem, MenuList, IconButton, Drawer,
    DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure,
    VStack, HStack
} from "@chakra-ui/react";
import { FiLogOut, FiUser, FiMenu, FiShield } from "react-icons/fi";
import { useNav } from "@/app/providers/NavigationProvider";
import { useAuth } from '@/app/providers/Providers';
import { useRouter } from "next/navigation";

function Navbar() {
    const { auth, initialized } = useAuth();
    const [profilePic, setProfilePic] = useState();
    const { navActionButton } = useNav();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        setIsMobile(window.innerWidth < 1024);
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setProfilePic(auth?.tokenParsed?.picture);
    }, [auth]);

    const onLogout = () => {
        auth.logout()
            .then(() => router.push('/'))
            .catch((error) => console.error('Logout failed:', error));
    };

    const displayName = auth?.tokenParsed?.displayName
        || `${auth?.tokenParsed?.firstName || ""} ${auth?.tokenParsed?.lastName || ""}`.trim()
        || auth?.tokenParsed?.email?.split("@")[0]
        || "User";

    const isAdmin = auth?.role === 'admin';

    const NavLinks = ({ onLinkClick }) => (
        <>
            <Link passHref href="/portfolio/projects" className="font-impact hover:text-gray-700" onClick={onLinkClick}>PROJECTS</Link>
            <Link passHref href="/portfolio/achievements" className="font-impact hover:text-gray-700" onClick={onLinkClick}>ACHIEVEMENTS</Link>
            <Link passHref href="/blog" className="font-impact hover:text-gray-700" onClick={onLinkClick}>BLOG</Link>
            <Link passHref href="/about" className="font-impact hover:text-gray-700" onClick={onLinkClick}>ABOUT US</Link>
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
                        <Button
                            bg="black"
                            color="white"
                            size="sm"
                            _hover={{ bg: "gray.700" }}
                            onClick={navActionButton.action}
                        >
                            {navActionButton.label}
                        </Button>
                    )}

                    {initialized && auth && auth.authenticated ? (
                        <div className="flex items-center gap-2">
                            <p className="text-base text-black text-decoration-none hidden sm:block">
                                {displayName}
                            </p>
                            <Menu placement="bottom-end">
                                <MenuButton>
                                    <Avatar
                                        src={profilePic}
                                        alt={displayName}
                                        name={displayName}
                                        size={{ base: "sm", md: "md" }}
                                        cursor="pointer"
                                        _hover={{ opacity: 0.8 }}
                                    />
                                </MenuButton>
                                <MenuList minW="200px">
                                    <MenuItem icon={<FiUser />} onClick={() => router.push('/profile')}>
                                        Profile
                                    </MenuItem>
                                    {isAdmin && (
                                        <MenuItem icon={<FiShield />} onClick={() => router.push('/admin/blogs')}>
                                            Admin Panel
                                        </MenuItem>
                                    )}
                                    <MenuItem icon={<FiLogOut />} onClick={onLogout}>
                                        Sign out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    ) : (
                        // Demoted sign-in: small text link, not a prominent CTA.
                        !isMobile && initialized && (
                            <Link
                                href="/auth/login"
                                className="text-sm text-gray-600 hover:text-gray-900 hover:underline px-2"
                            >
                                Sign in
                            </Link>
                        )
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

            {/* Mobile Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody mt={10}>
                        <VStack spacing={6} align="flex-start">
                            <NavLinks onLinkClick={onClose} />

                            {navActionButton.label !== "" && (
                                <Button
                                    bg="black"
                                    color="white"
                                    _hover={{ bg: "gray.700" }}
                                    onClick={() => {
                                        onClose();
                                        navActionButton.action();
                                    }}
                                >
                                    {navActionButton.label}
                                </Button>
                            )}

                            {!initialized || !auth || !auth.authenticated ? (
                                <HStack spacing={4} pt={4} w="full">
                                    <Link href="/auth/login" className="text-sm hover:underline" onClick={onClose}>
                                        Sign in
                                    </Link>
                                    <span>|</span>
                                    <Link href="/auth/signup" className="text-sm hover:underline" onClick={onClose}>
                                        Sign up
                                    </Link>
                                </HStack>
                            ) : (
                                <VStack spacing={3} pt={4} w="full" align="flex-start">
                                    <p className="text-base text-black">{displayName}</p>
                                    <Button
                                        variant="ghost"
                                        leftIcon={<FiUser />}
                                        onClick={() => { onClose(); router.push('/profile'); }}
                                    >
                                        Profile
                                    </Button>
                                    {isAdmin && (
                                        <Button
                                            variant="ghost"
                                            leftIcon={<FiShield />}
                                            onClick={() => { onClose(); router.push('/admin/blogs'); }}
                                        >
                                            Admin Panel
                                        </Button>
                                    )}
                                    <Button variant="ghost" leftIcon={<FiLogOut />} onClick={() => { onClose(); onLogout(); }}>
                                        Sign out
                                    </Button>
                                </VStack>
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
