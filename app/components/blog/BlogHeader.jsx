import { Box, Heading, HStack, VStack, Text } from '@chakra-ui/react';
import { BiLike, BiComment } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';

export default function BlogHeader({title,author,date,info,likes,comments}){
    return(
        <Box width={'full'} py={16}>
            <VStack spacing={2} align={"left"}>
                <Heading as="h1" size="4xl" fontWeight="bold" className={'font-anton'}>
                    {title}
                </Heading>
                <HStack spacing={2} color="gray.600">
                    <Text>{author}</Text>
                    <Text>|</Text>
                    <Text>{date}</Text>
                    <Text>|</Text>
                    <Text>{info}</Text>
                </HStack>
                <HStack marginTop={8} spacing={6}>
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