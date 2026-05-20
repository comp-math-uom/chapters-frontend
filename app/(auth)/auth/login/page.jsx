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
    const [unverifiedEmail, setUnverifiedEmail] = useState(null);
    const [resendStatus, setResendStatus] = useState(null);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        if (initialized && auth.authenticated) {
            router.push('/');
        }
    }, [initialized, auth, router]);

    const validateEmail = (value) => {
        if (!value) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return 'Invalid email address';
    };

    const validatePassword = (value) => {
        if (!value) return 'Password is required';
    };

    const handleSubmit = async (values, actions) => {
        try {
            const { error } = await authService.signin(values.email, values.password);
            if (error) {
                const isUnverified = /confirm|verify/i.test(error.message || '');
                if (isUnverified) {
                    setUnverifiedEmail(values.email);
                    actions.setStatus({ error: null });
                } else {
                    actions.setStatus({ error: error.message || 'Sign in failed. Please try again.' });
                }
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

    const onResend = async () => {
        if (!unverifiedEmail) return;
        setResending(true);
        setResendStatus(null);
        try {
            const { error } = await supabase.auth.resend({ type: 'signup', email: unverifiedEmail });
            setResendStatus(error ? 'error' : 'sent');
        } catch {
            setResendStatus('error');
        } finally {
            setResending(false);
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

                    <Box w="full" bg="white" rounded="lg" shadow="lg" p={8}>
                        {unverifiedEmail && (
                            <Alert status="warning" borderRadius="md" mb={4}>
                                <AlertIcon />
                                <Stack spacing={2} flex={1}>
                                    <Text fontSize="sm">
                                        Your email <strong>{unverifiedEmail}</strong> hasn&apos;t been verified yet.
                                        Please click the link in the verification email we sent you.
                                    </Text>
                                    {resendStatus === 'sent' && (
                                        <Text fontSize="sm" color="green.600">Verification email resent.</Text>
                                    )}
                                    {resendStatus === 'error' && (
                                        <Text fontSize="sm" color="red.600">Failed to resend. Try again shortly.</Text>
                                    )}
                                    <HStack>
                                        <Button size="sm" onClick={onResend} isLoading={resending}>
                                            Resend verification email
                                        </Button>
                                    </HStack>
                                </Stack>
                            </Alert>
                        )}
                        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
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
