import {Box, Heading, HStack, VStack, Text, Flex, Tag, Avatar} from '@chakra-ui/react';

export default function BlogContent({blog}){
    return(
        <Box width={'full'} marginTop={-6} px={20}>
            <VStack spacing={8} align="left">
                {blog.content && blog.content.map((section, index) => (
                    <VStack key={index} spacing={4} align="left">
                        {section.heading && (
                            <Heading as="h2" size="md" fontWeight="bold">
                                {section.heading}
                            </Heading>
                        )}
                        {section.text && (
                            <Text fontSize="md" color="gray.700" lineHeight="tall">
                                {section.text}
                            </Text>
                        )}
                    </VStack>
                ))}
            </VStack>
        </Box>
    )
}