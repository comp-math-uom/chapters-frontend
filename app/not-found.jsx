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
                flex="1"
                alignItems="center"
                justifyContent="center"
                direction="column"
                textAlign="center"
                py={{ base: 12, md: 20 }}
            >
                <Box mb={8}>
                    <Image src={img} alt="Page Not Found" width={500}/>
                </Box>
                <Heading size="2xl" mb={4} fontFamily="display" color="slate.900">
                    Oops! Page Not Found
                </Heading>
                <Text color="slate.500" mb={8}>
                    The page you are looking for does not seem to exist.
                </Text>
                <Button
                    leftIcon={<FaHome/>}
                    bg="slate.900"
                    color="white"
                    _hover={{bg: "primary.600"}}
                    borderRadius="full"
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