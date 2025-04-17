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
    HStack,
    Input,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import Link from "next/link";

export default function Page() {

    const validateField = (value, field) => {
        if (!value) {
            return `${field} is required`;
        }
    };

    const validateEmail = (value) => {
        if (!value) {
            return 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return 'Invalid email address';
        }
    };

    const validatePassword = (value) => {
        if (!value) {
            return 'Password is required';
        } else if (value.length < 8) {
            return 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
            return 'Password must contain uppercase, lowercase and numbers';
        }
    };

    const validateConfirmPassword = (pass, value) => {
        if (!value) {
            return 'Please confirm your password';
        } else if (pass !== value) {
            return 'Passwords do not match';
        }
    };

    const handleSubmit = async (values, actions) => {
        try {
            // Handle signup logic here
            console.log('Signup values:', values);
            actions.setSubmitting(false);
        } catch (error) {
            actions.setSubmitting(false);
            actions.setStatus({error: 'Signup failed. Please try again.'});
        }
    };

    return (
        <Flex minH="100vh" bg="gray.50" alignItems="center" justifyContent="center" py={12} px={4}>
            <Container maxW="md">
                <VStack spacing={8}>
                    <VStack spacing={2} textAlign="center">
                        <Heading fontSize="3xl" color="gray.700">
                            Create an Account
                        </Heading>
                        <Text color="gray.700" opacity={0.8}>
                            Join to share your amazing portfolio
                        </Text>
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
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
                            onSubmit={handleSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <Stack spacing={5}>
                                        <HStack spacing={4}>
                                            <Field name="firstName"
                                                   validate={(value) => validateField(value, 'First name')}>
                                                {({field, form}) => (
                                                    <FormControl
                                                        isInvalid={form.errors.firstName && form.touched.firstName}>
                                                        <FormLabel color="gray.700">First Name</FormLabel>
                                                        <Input
                                                            {...field}
                                                            placeholder="John"
                                                            bg='gray.50'
                                                            borderColor='gray.300'
                                                            _hover={{
                                                                borderColor: 'gray.400'
                                                            }}
                                                        />
                                                        <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field name="lastName"
                                                   validate={(value) => validateField(value, 'Last name')}>
                                                {({field, form}) => (
                                                    <FormControl
                                                        isInvalid={form.errors.lastName && form.touched.lastName}>
                                                        <FormLabel color="gray.700">Last Name</FormLabel>
                                                        <Input
                                                            {...field}
                                                            placeholder="Doe"
                                                            bg='gray.50'
                                                            borderColor='gray.300'
                                                            _hover={{
                                                                borderColor: 'gray.400'
                                                            }}
                                                        />
                                                        <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </HStack>

                                        <Field name="email" validate={validateEmail}>
                                            {({field, form}) => (
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
                                            {({field, form}) => (
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

                                        <Field name="confirmPassword"
                                               validate={(value) => validateConfirmPassword(props.values.password, value)}>
                                            {({field, form}) => (
                                                <FormControl
                                                    isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                    <FormLabel color="gray.700">Confirm Password</FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                        placeholder="Confirm your password"
                                                        bg='gray.50'
                                                        borderColor='gray.300'
                                                        _hover={{
                                                            borderColor: 'gray.400'
                                                        }}
                                                    />
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
                                            _hover={{
                                                bg: "gray.700"
                                            }}
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
                        <Button variant="link" color="gray.600" _hover={{color: "gray.700"}} fontSize="sm">
                            <Link href={"/auth/login"}>
                                Sign in
                            </Link>
                        </Button>
                    </Text>
                </VStack>
            </Container>
        </Flex>
    );
};