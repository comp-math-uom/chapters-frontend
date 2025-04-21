import React from 'react';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

export default function LoadingSpinner({text = "Please wait..."}) {
    return (
        <Flex width="100%" height="25vh" justify="center" rounded="md" align="center" bg="gray.50">
            <VStack spacing={6}>
                <Spinner thickness="4px" speed="0.75s" emptyColor="gray.200" color="gray.600" width="70px"
                         height="70px"/>
                <Text fontSize="lg" fontWeight="medium" color="gray.700" textAlign="center">
                    {text}
                </Text>
            </VStack>
        </Flex>
    );
};