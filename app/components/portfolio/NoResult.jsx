import React from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';

const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
    >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export default function NoSearchResults({ onClear }) {
    return (
        <VStack
            spacing={4}
            py={12}
            px={4}
            className="w-full mx-auto text-center bg-gray-50 rounded-lg"
        >
            <Box className="p-4 bg-gray-100 rounded-full">
                <SearchIcon />
            </Box>

            <Text className="text-2xl font-semibold text-gray-900">
                No Results Found
            </Text>

            <Text className="text-gray-600 max-w-md">
                We couldn't find any items matching your search criteria. Try adjusting your filters or search terms.
            </Text>

            <Button
                onClick={onClear}
                colorScheme="gray"
                className="mt-2"
                _focusVisible={{outline: 'none'}}
            >
                Clear Filters
            </Button>
        </VStack>
    );
};