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

    const navLinkClass = "relative font-impact text-sm tracking-wide text-slate-700 transition-colors duration-200 hover:text-primary-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full";

    const NavLinks = ({ onLinkClick }) => (
        <>
            <Link passHref href="/" className={navLinkClass} onClick={onLinkClick}>HOME</Link>
            <Link passHref href="/portfolio/projects" className={navLinkClass} onClick={onLinkClick}>PROJECTS</Link>
            <Link passHref href="/portfolio/achievements" className={navLinkClass} onClick={onLinkClick}>ACHIEVEMENTS</Link>
            <Link passHref href="/blog" className={navLinkClass} onClick={onLinkClick}>BLOG</Link>
            <Link passHref href="/about" className={navLinkClass} onClick={onLinkClick}>ABOUT US</Link>
        </>
    );

    return (
        <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-nav">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 container mx-auto">
                <div className="ml-0 sm:ml-4 md:ml-14">
                    <Link href="/" passHref>
                        <h1 className="m-0 text-xl ml-4 md:ml-0 sm:text-2xl md:text-3xl font-logo cursor-pointer transition-colors hover:text-primary-600">CHAPTERS</h1>
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
                            bg="slate.900"
                            color="white"
                            size="sm"
                            borderRadius="full"
                            px={5}
                            boxShadow="sm"
                            transition="all 0.2s"
                            _hover={{ bg: "primary.600", boxShadow: "md", transform: "translateY(-1px)" }}
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
                                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors px-2"
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
                            borderRadius="full"
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
                                    bg="slate.900"
                                    color="white"
                                    borderRadius="full"
                                    boxShadow="sm"
                                    _hover={{ bg: "primary.600" }}
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
                                    <Link href="/auth/login" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors" onClick={onClose}>
                                        Sign in
                                    </Link>
                                    <span className="text-slate-300">|</span>
                                    <Link href="/auth/signup" className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors" onClick={onClose}>
                                        Sign up
                                    </Link>
                                </HStack>
                            ) : (
                                <VStack spacing={3} pt={4} w="full" align="flex-start">
                                    <p className="text-base text-slate-900 font-medium">{displayName}</p>
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
        </div>
    );
}

export default Navbar;
