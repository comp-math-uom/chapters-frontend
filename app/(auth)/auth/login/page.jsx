'use client'

import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Heading,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import Link from "next/link";

export default function Page() {
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
        } else if (value.length < 6) {
            return 'Password must be at least 6 characters';
        }
    };

    const handleSubmit = async (values, actions) => {
        try {
            // Handle login logic here
            console.log('Login values:', values);
            actions.setSubmitting(false);
        } catch (error) {
            actions.setSubmitting(false);
            actions.setStatus({ error: 'Login failed. Please try again.' });
        }
    };

    return (
        <Flex minH="100vh" bg="gray.50" alignItems="center" justifyContent="center" py={12} px={4}>
            <Container maxW="md">
                <VStack spacing={8}>
                    <VStack spacing={2} textAlign="center">
                        <Heading fontSize="3xl" color="gray.700">
                            Welcome Back
                        </Heading>
                        <Text color="gray.700" opacity={0.8}>
                            Sign in to manage your portfolio
                        </Text>
                    </VStack>

                    <Box w="full" bg="white" rounded="lg" shadow="lg" p={8}>
                        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
                            {(props) => (
                                <Form>
                                    <Stack spacing={5}>
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
                                            Login
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Box>

                    <Text color="gray.700" fontSize="sm">
                        Don't have an account?{' '}
                        <Button variant="link" color="gray.600" _hover={{ color: "gray.700" }} fontSize="sm">
                            <Link href={"/auth/signup"}>
                                Sign up
                            </Link>
                        </Button>
                    </Text>
                </VStack>
            </Container>
        </Flex>
    );
};