import React from 'react';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

export default function LoadingSpinner({text = "Please wait..."}) {
    return (
        <Flex width="100%" height="25vh" justify="center" rounded="2xl" align="center" bg="slate.50">
            <VStack spacing={6}>
                <Spinner thickness="4px" speed="0.75s" emptyColor="slate.200" color="primary.500" width="60px"
                         height="60px"/>
                <Text fontSize="lg" fontWeight="medium" color="slate.600" textAlign="center">
                    {text}
                </Text>
            </VStack>
        </Flex>
    );
};