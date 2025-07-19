'use client'

import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import Link from "next/link";
import { useKeycloak } from '@/app/providers/Providers';
import { redirect } from 'next/dist/server/api-utils';

export default function Page() {
    const { keycloak, initialized } = useKeycloak();

    const handleKeycloakLogin = () => {
        if (keycloak) {
            keycloak.login({ redirectUri: process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI });
        }
        console.log(keycloak.token);
    };

    if (!initialized) {
        return <div>Loading authentication...</div>;
    }

    if (keycloak && keycloak.authenticated) {
        return <div>You are logged in as {keycloak.tokenParsed?.preferred_username || keycloak.tokenParsed?.email} <button onClick={() => keycloak.logout()}>Logout</button></div>;
    }

    return (
        <Flex minH="100vh" bg="gray.50" alignItems="center" justifyContent="center" py={12} px={4}>
            <Container maxW="md" width="700px">
                <VStack spacing={10}>
                    <VStack spacing={3} textAlign="center">
                        <Heading fontSize="4xl" fontWeight="bold" color="gray.700" letterSpacing="tight">
                            Welcome Back
                        </Heading>
                        <Text color="gray.700" opacity={0.8} fontSize="lg">
                            Sign in to manage your portfolio
                        </Text>
                    </VStack>
                    <Box w="full" bg="white" rounded="xl" shadow="2xl" p={10} border="1px" borderColor="gray.100">
                        <Button
                            onClick={handleKeycloakLogin}
                            bg="black"
                            color="white"
                            size="lg"
                            fontSize="md"
                            fontWeight="semibold"
                            borderRadius="lg"
                            h={12}
                            _hover={{ bg: "gray.700", transform: "translateY(-1px)", boxShadow: "lg" }}
                            _active={{ transform: "translateY(0px)" }}
                            transition="all 0.2s"
                        >
                            Sign In with Keycloak
                        </Button>
                    </Box>
                </VStack>
            </Container>
        </Flex>
    );
}