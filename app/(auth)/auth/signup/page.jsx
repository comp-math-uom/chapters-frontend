'use client'

import React, { useEffect, useState } from 'react';
import {
    Alert, AlertIcon, Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel,
    Heading, HStack, Input, Stack, Text, VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { authService } from "@/app/lib/services/authService";
import { supabase } from "@/app/lib/services/supabase";
import { useAuth } from '@/app/providers/Providers';
import { useRouter } from "next/navigation";

export default function Page() {
    const { auth, initialized } = useAuth();
    const router = useRouter();
    const [submittedEmail, setSubmittedEmail] = useState(null);
    const [resendStatus, setResendStatus] = useState(null); // 'sent' | 'error' | null
    const [resending, setResending] = useState(false);

    useEffect(() => {
        if (initialized && auth.authenticated) {
            router.push('/');
        }
    }, [initialized, auth, router]);

    const validateField = (value, field) => {
        if (!value) return `${field} is required`;
    };

    const validateEmail = (value) => {
        if (!value) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return 'Invalid email address';
    };

    const validatePassword = (value) => {
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) return 'Password must contain uppercase, lowercase and numbers';
    };

    const validateConfirmPassword = (pass, value) => {
        if (!value) return 'Please confirm your password';
        if (pass !== value) return 'Passwords do not match';
    };

    const handleSubmit = async (values, actions) => {
        try {
            const { data, error } = await authService.signup(
                values.email, values.password, values.email, values.firstName, values.lastName
            );
            if (error) {
                actions.setStatus({ error: error.message || 'Signup failed. Please try again.' });
                actions.setSubmitting(false);
                return;
            }
            actions.setSubmitting(false);

            // Supabase returns a user immediately for email-confirmation signups,
            // but session is null until they verify. Show a "check your inbox" card.
            if (data?.user && !data?.session) {
                setSubmittedEmail(values.email);
            } else {
                // Auto-confirmed (e.g. confirmation disabled): straight to home.
                router.push('/');
            }
        } catch (error) {
            actions.setSubmitting(false);
            actions.setStatus({ error: 'Signup failed. Please try again.' });
        }
    };

    const onResend = async () => {
        if (!submittedEmail) return;
        setResending(true);
        setResendStatus(null);
        try {
            const { error } = await supabase.auth.resend({ type: 'signup', email: submittedEmail });
            setResendStatus(error ? 'error' : 'sent');
        } catch {
            setResendStatus('error');
        } finally {
            setResending(false);
        }
    };

    // ---- Success state: "Check your inbox" card ----
    if (submittedEmail) {
        return (
            <Flex bg="gray.50" alignItems="center" justifyContent="center" minH="80vh">
                <Container maxW="md">
                    <VStack spacing={6}>
                        <Heading fontFamily="impact" fontSize="6xl" color="gray.700">
                            C H A P T E R S
                        </Heading>
                        <Box w="full" bg="white" rounded="lg" shadow="lg" p={8}>
                            <VStack spacing={5} align="stretch">
                                <Heading fontSize="2xl" color="gray.700" textAlign="center">
                                    Check your inbox
                                </Heading>
                                <Alert status="info" borderRadius="md">
                                    <AlertIcon />
                                    <Text fontSize="sm">
                                        We sent a verification link to <strong>{submittedEmail}</strong>.
                                        Click the link in that email to activate your account before signing in.
                                    </Text>
                                </Alert>

                                <Text fontSize="sm" color="gray.600" textAlign="center">
                                    Didn&apos;t get the email? Check your spam folder or resend it below.
                                </Text>

                                {resendStatus === 'sent' && (
                                    <Alert status="success" borderRadius="md">
                                        <AlertIcon />
                                        Verification email resent.
                                    </Alert>
                                )}
                                {resendStatus === 'error' && (
                                    <Alert status="error" borderRadius="md">
                                        <AlertIcon />
                                        Failed to resend. Please try again in a minute.
                                    </Alert>
                                )}

                                <HStack justify="center" spacing={3}>
                                    <Button onClick={onResend} variant="outline" isLoading={resending}>
                                        Resend email
                                    </Button>
                                    <Button bg="black" color="white" _hover={{ bg: "gray.700" }} onClick={() => router.push('/auth/login')}>
                                        Back to sign in
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>
                    </VStack>
                </Container>
            </Flex>
        );
    }

    // ---- Default state: signup form ----
    return (
        <Flex bg="gray.50" alignItems="center" justifyContent="center">
            <Container maxW="md">
                <VStack spacing={8}>
                    <VStack textAlign="center">
                        <Heading fontFamily="impact" fontSize="6xl" color="gray.700">
                            C H A P T E R S
                        </Heading>
                    </VStack>

                    <Box w="full" bg="white" rounded="lg" shadow="lg" p={8}>
                        <Formik
                            initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <Stack spacing={5}>
                                        <Heading className='text-center mb-4' fontSize="2xl" color="gray.700">
                                            Create an Account
                                        </Heading>
                                        <HStack spacing={4}>
                                            <Field name="firstName" validate={(value) => validateField(value, 'First name')}>
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                                                        <FormLabel color="gray.700">First Name</FormLabel>
                                                        <Input {...field} placeholder="John" bg='gray.50' borderColor='gray.300' _hover={{ borderColor: 'gray.400' }} />
                                                        <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field name="lastName" validate={(value) => validateField(value, 'Last name')}>
                                                {({ field, form }) => (
                                                    <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                                                        <FormLabel color="gray.700">Last Name</FormLabel>
                                                        <Input {...field} placeholder="Doe" bg='gray.50' borderColor='gray.300' _hover={{ borderColor: 'gray.400' }} />
                                                        <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </HStack>

                                        <Field name="email" validate={validateEmail}>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <FormLabel color="gray.700">Email address</FormLabel>
                                                    <Input {...field} type="email" placeholder="your@email.com" bg='gray.50' borderColor='gray.300' _hover={{ borderColor: 'gray.400' }} />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name="password" validate={validatePassword}>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                    <FormLabel color="gray.700">Password</FormLabel>
                                                    <Input {...field} type="password" placeholder="Enter your password" bg='gray.50' borderColor='gray.300' _hover={{ borderColor: 'gray.400' }} />
                                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name="confirmPassword" validate={(value) => validateConfirmPassword(props.values.password, value)}>
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                    <FormLabel color="gray.700">Confirm Password</FormLabel>
                                                    <Input {...field} type="password" placeholder="Confirm your password" bg='gray.50' borderColor='gray.300' _hover={{ borderColor: 'gray.400' }} />
                                                    <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
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
                                            _hover={{ bg: "gray.700" }}
                                        >
                                            Create Account
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Box>

                    <Text color="gray.700" fontSize="sm">
                        Already have an account?{' '}
                        <Button variant="link" color="gray.600" _hover={{ color: "gray.700" }} fontSize="sm" onClick={() => router.push('/auth/login')}>
                            Sign in
                        </Button>
                    </Text>
                </VStack>
            </Container>
        </Flex>
    );
};
