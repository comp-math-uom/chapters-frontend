'use client'

import {useEffect} from 'react'
import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import Navbar from "@/app/components/common/Navbar";
import Image from "next/image";
import img from "@/public/img/404.svg";
import {FaHome} from "react-icons/fa";
import Link from "next/link";
import Footer from "@/app/components/common/Footer";
import ErrorBlock from "@/app/components/common/ErrorBlock";

export default function Error({error, reset}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <Flex
                h="calc(100vh - 484px)"
                alignItems="center"
                justifyContent="center"
                direction="column"
                mt={90}
                textAlign="center"
            >
                <ErrorBlock msg="Cannot load the data"/>
            </Flex>
            <Footer/>
        </div>
    )
}