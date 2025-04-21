import { Avatar, Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { BiComment, BiLike } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';

export default function BlogHeader({blog}) {
    return (
        <Box width={'full'} paddingTop={16} px={20}>
            <VStack spacing={2} align={"left"}>
                <Heading as="h1" size="4xl" fontWeight="bold" className={'font-anton'}>
                    {blog.title}
                </Heading>
                <HStack spacing={2} mt={5}>
                    <Avatar src={blog.avatar}/>
                    <VStack align={"left"}>
                        <HStack spacing={2} color="gray.700" fontSize={"lg"}>
                            <Text>Written by {blog.author}</Text>
                            <Text>|</Text>
                            <Text>{blog.date}</Text>
                        </HStack>
                        <Flex wrap="wrap" gap={2} marginTop={-3}>
                            {blog.hashtags.map((tag, index) => (
                                <Text
                                    key={index}
                                    fontSize="m"
                                    color="gray.600"
                                >
                                    #{tag}
                                </Text>
                            ))}
                        </Flex>
                    </VStack>
                </HStack>
                <HStack marginTop={6} spacing={6}>
                    <HStack className="cursor-pointer hover:opacity-80">
                        <BiLike size={23} className="text-gray-600"/>
                        <Text fontSize="sm" color="gray.600">{blog.likes}</Text>
                    </HStack>
                    <HStack spacing={1} className="cursor-pointer hover:opacity-80">
                        <BiComment size={23} className="text-gray-600"/>
                        <Text fontSize="sm" color="gray.600">{blog.comments}</Text>
                    </HStack>
                    <HStack spacing={1} className="cursor-pointer hover:opacity-80">
                        <BsShare size={20} className="text-gray-600"/>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    )
}