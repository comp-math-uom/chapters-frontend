'use client'

import React from 'react';
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
    VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { authService } from "@/app/lib/services/authService";
import { useAuth } from '@/app/providers/Providers';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { auth, initialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (initialized && auth.authenticated) {
            router.push('/');
        }
    }, [initialized, auth, router]);

    const validateEmail = (value) => {
        if (!value) {
            return 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return 'Invalid email address';
        }
    };

    const validatePassword = (value) => {
        if (!value) {
            return 'Password is required';
        }
    };

    const handleSubmit = async (values, actions) => {
        try {
            const { error } = await authService.signin(values.email, values.password);
            if (error) {
                actions.setStatus({ error: error.message || 'Sign in failed. Please try again.' });
                actions.setSubmitting(false);
                return;
            }
            actions.setSubmitting(false);
            router.push('/');
        } catch (_error) {
            actions.setSubmitting(false);
            actions.setStatus({ error: 'Sign in failed. Please try again.' });
        }
    };

    return (
        <Flex bg="gray.50" alignItems="center" justifyContent="center">
            <Container maxW="md">
                <VStack spacing={8}>
                    <VStack textAlign="center">
                        <Heading fontFamily="impact" fontSize="6xl" color="gray.700">
                            C H A P T E R S
                        </Heading>
                    </VStack>

                    <Box
                        w="full"
                        bg="white"
                        rounded="lg"
                        shadow="lg"
                        p={8}
                    >
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <Stack spacing={5}>
                                        <Heading className='text-center mb-4' fontSize="2xl" color="gray.700">
                                            Sign In
                                        </Heading>

                                        <Field name="email" validate={validateEmail}>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <FormLabel color="gray.700">Email address</FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="your@email.com"
                                                        bg='gray.50'
                                                        borderColor='gray.300'
                                                        _hover={{
                                                            borderColor: 'gray.400'
                                                        }}
                                                    />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name="password" validate={validatePassword}>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                    <FormLabel color="gray.700">Password</FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        bg='gray.50'
                                                        borderColor='gray.300'
                                                        _hover={{
                                                            borderColor: 'gray.400'
                                                        }}
                                                    />
                                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        {props.status && props.status.error && (
                                            <Text color="red.500" fontSize="sm" textAlign="center">
                                                {props.status.error}
                                            </Text>
                                        )}

                                        <Button
                                            type="submit"
                                            bg="black"
                                            color="white"
                                            size="lg"
                                            fontSize="md"
                                            isLoading={props.isSubmitting}
                                            _hover={{
                                                bg: "gray.700"
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Box>

                    <Text color="gray.700" fontSize="sm">
                        Need an account?{' '}
                        <Button variant="link" color="gray.600" _hover={{ color: "gray.700" }} fontSize="sm" onClick={() => router.push('/auth/signup')}>
                            Sign up
                        </Button>
                    </Text>
                </VStack>
            </Container>
        </Flex>
    );
};
