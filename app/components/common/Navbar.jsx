"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useNav } from "@/app/providers/NavigationProvider";

function Navbar() {
    const [username, setUsername] = useState();
    const [profilePic, setProfilePic] = useState();
    const {navActionButton} = useNav();

    useEffect(() => {
        let un = localStorage.getItem("username");
        let pp = "https://bit.ly/broken-link";
        setUsername("John Doe");
        setProfilePic(pp);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <div className="flex items-center justify-between px-5 py-3 container m-auto">
                <div className="ml-14">
                    <Link href="/" passHref>
                        <h1 className="m-0 text-3xl font-impact cursor-pointer">CHAPTERS</h1>
                    </Link>
                </div>
                <div className="flex items-center gap-5">
                    {navActionButton.label !== "" && (
                        <Button variant="ghost" onClick={navActionButton.action}>
                            {navActionButton.label}
                        </Button>
                    )
                    }
                    {username ? (
                        <div className="flex items-center gap-2">
                            <p className="text-base text-black text-decoration-none">{username}</p>
                            {profilePic && (
                                <Menu placement="bottom-end">
                                    <MenuButton>
                                        <Avatar
                                            src={profilePic}
                                            alt={username}
                                            name={username}
                                            size="md"
                                            cursor="pointer"
                                            _hover={{opacity: 0.8}}
                                        />
                                    </MenuButton>
                                    <MenuList minW="200px">
                                        <MenuItem icon={<FiUser/>}>
                                            Profile
                                        </MenuItem>
                                        <MenuItem icon={<FiLogOut/>}>
                                            Sign out
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-4 mr-14">
                            <Link href="auth/login" className="hover:underline">Sign In</Link> &nbsp; &nbsp; |
                            <Link href="auth/signup" className="hover:underline">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
            <hr/>
        </div>
    );
}

export default Navbar;