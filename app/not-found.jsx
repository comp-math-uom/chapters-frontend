import img from "../public/img/404.svg";
import Image from "next/image";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function NotFound() {
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
                <Box mb={8}>
                    <Image src={img} alt="Page Not Found" width={500}/>
                </Box>
                <Heading size="2xl" mb={4}>
                    Oops! Page Not Found
                </Heading>
                <Text color="gray.500" mb={8}>
                    The page you are looking for does not seem to exist.
                </Text>
                <Button
                    leftIcon={<FaHome/>}
                    bg="black"
                    color="white"
                    _hover={{bg: "gray.800"}}
                    borderRadius="md"
                    py={5}
                >
                    <Link href="/">
                        Go to Home

                    </Link>
                </Button>
            </Flex>
            <Footer/>
        </div>
    );
}