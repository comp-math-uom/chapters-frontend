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
            actions.setStatus({error: 'Login failed. Please try again.'});
        }
    };

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

                    <Box 
                        w="full" 
                        bg="white" 
                        rounded="xl" 
                        shadow="2xl" 
                        p={10}
                        border="1px"
                        borderColor="gray.100"
                    >
                        <Formik initialValues={{email: '', password: ''}} onSubmit={handleSubmit}>
                            {(props) => (
                                <Form>
                                    <Stack spacing={6}>
                                        <Field name="email" validate={validateEmail}>
                                            {({field, form}) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <FormLabel 
                                                        color="gray.700" 
                                                        fontSize="sm" 
                                                        fontWeight="semibold"
                                                        mb={2}
                                                    >
                                                        Email address
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="your@email.com"
                                                        bg='gray.50'
                                                        borderColor='gray.300'
                                                        size="lg"
                                                        borderRadius="lg"
                                                        _placeholder={{
                                                            color: 'gray.500'
                                                        }}
                                                        _hover={{
                                                            borderColor: 'gray.400',
                                                            bg: 'gray.100'
                                                        }}
                                                        _focus={{
                                                            borderColor: 'gray.600',
                                                            boxShadow: '0 0 0 1px var(--chakra-colors-gray-600)',
                                                            bg: 'white'
                                                        }}
                                                    />
                                                    <FormErrorMessage fontSize="xs">{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name="password" validate={validatePassword}>
                                            {({field, form}) => (
                                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                    <FormLabel 
                                                        color="gray.700" 
                                                        fontSize="sm" 
                                                        fontWeight="semibold"
                                                        mb={2}
                                                    >
                                                        Password
                                                    </FormLabel>
                                                    <Input
                                                        {...field}
                                                        type="password"
                                                        placeholder="Enter your password"
                                                        bg='gray.50'
                                                        borderColor='gray.300'
                                                        size="lg"
                                                        borderRadius="lg"
                                                        _placeholder={{
                                                            color: 'gray.500'
                                                        }}
                                                        _hover={{
                                                            borderColor: 'gray.400',
                                                            bg: 'gray.100'
                                                        }}
                                                        _focus={{
                                                            borderColor: 'gray.600',
                                                            boxShadow: '0 0 0 1px var(--chakra-colors-gray-600)',
                                                            bg: 'white'
                                                        }}
                                                    />
                                                    <FormErrorMessage fontSize="xs">{form.errors.password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        {props.status && props.status.error && (
                                            <Box 
                                                bg="red.50" 
                                                border="1px" 
                                                borderColor="red.200" 
                                                borderRadius="lg" 
                                                p={3}
                                            >
                                                <Text color="red.500" fontSize="sm" textAlign="center" fontWeight="medium">
                                                    {props.status.error}
                                                </Text>
                                            </Box>
                                        )}

                                        <Button
                                            type="submit"
                                            bg="black"
                                            color="white"
                                            size="lg"
                                            fontSize="md"
                                            fontWeight="semibold"
                                            borderRadius="lg"
                                            h={12}
                                            isLoading={props.isSubmitting}
                                            _hover={{
                                                bg: "gray.700",
                                                transform: "translateY(-1px)",
                                                boxShadow: "lg"
                                            }}
                                            _active={{
                                                transform: "translateY(0px)"
                                            }}
                                            transition="all 0.2s"
                                        >
                                            Sign In
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Box>

                    <Box textAlign="center">
                        <Text color="gray.700" fontSize="sm" mb={2}>
                            Don&apost; have an account?
                        </Text>
                        <Button 
                            variant="link" 
                            color="gray.600" 
                            _hover={{
                                color: "gray.700",
                                textDecoration: "none"
                            }} 
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            <Link href={"/auth/signup"}>
                                Create one here
                            </Link>
                        </Button>
                    </Box>
                </VStack>
            </Container>
        </Flex>
    );
};