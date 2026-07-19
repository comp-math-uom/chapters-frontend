'use client';

import React from 'react';
import { Box, Container, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

export default function ErrorBlock({msg}) {

    return (
        <Container maxW="container.xl" p={0}>
            <Box width="100%" height="25vh" display="flex" alignItems="center" justifyContent="center" bg="slate.50" borderRadius="2xl">
                <VStack spacing={6} align="center" p={8}>
                    <Box p={4} bg="red.50" borderRadius="full">
                        <Icon as={WarningIcon} w={8} h={8} color="red.400"/>
                    </Box>
                    <VStack spacing={3}>
                        <Heading size="lg" color="slate.900" fontFamily="display" textAlign="center">
                            Oops! Something went wrong
                        </Heading>
                        <Text color="slate.600" fontSize="lg" textAlign="center">
                            {msg}
                        </Text>
                    </VStack>
                </VStack>
            </Box>
        </Container>
    );
};