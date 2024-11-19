'use client';

import React from 'react';
import {Box, Container, Heading, Icon, Text, VStack} from '@chakra-ui/react';
import {WarningIcon} from '@chakra-ui/icons';

export default function ErrorBlock({ msg }) {

    return (
        <Container maxW="container.xl" p={0}>
            <Box width="100%" height="25vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
                <VStack spacing={6} align="center" p={8}>
                    <Icon as={WarningIcon} w={16} h={16} color="gray.600"/>
                    <VStack spacing={3}>
                        <Heading size="lg" color="gray.700" textAlign="center">
                            Oops! Something went wrong
                        </Heading>
                        <Text color="gray.700" fontSize="lg" textAlign="center">
                            {msg}
                        </Text>
                    </VStack>
                </VStack>
            </Box>
        </Container>
    );
};