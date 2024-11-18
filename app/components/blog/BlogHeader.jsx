import { Box, Heading, HStack, VStack, Text,Flex,Tag } from '@chakra-ui/react';
import { BiLike, BiComment } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';

export default function BlogHeader({title,author,date,likes,comments,hashtags}){
    return(
        <Box width={'full'} py={16}>
            <VStack spacing={2} align={"left"}>
                <Heading as="h1" size="4xl" fontWeight="bold" className={'font-anton'}>
                    {title}
                </Heading>
                <HStack spacing={2} color="gray.600" fontSize={"xl"}>
                    <Text>Written by {author}</Text>
                    <Text>|</Text>
                    <Text>{date}</Text>
                </HStack>
                <Flex wrap="wrap" gap={1} marginTop={-2}>
                    {hashtags.map((tag, index) => (
                        <Text
                            key={index}
                            fontSize="m"
                            color="gray.500"
                        >
                            #{tag}
                        </Text>
                    ))}
                </Flex>
                <HStack marginTop={6} spacing={6}>
                    <HStack className="cursor-pointer hover:opacity-80">
                        <BiLike size={23} className="text-gray-600" />
                        <Text fontSize="sm" color="gray.600">{likes}</Text>
                    </HStack>
                    <HStack spacing={1} className="cursor-pointer hover:opacity-80">
                        <BiComment size={23} className="text-gray-600" />
                        <Text fontSize="sm" color="gray.600">{comments}</Text>
                    </HStack>
                    <HStack spacing={1} className="cursor-pointer hover:opacity-80">
                        <BsShare size={20} className="text-gray-600" />
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    )
}