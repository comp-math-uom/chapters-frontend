import { Avatar, Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";


export default function BlogPreview({blogPreview}) {
    return (
        <Card 
            maxW={['100%', 'sm']} 
            className="mt-10" 
            boxShadow='md'
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            _hover={{
                transform: "translateY(-8px)",
                boxShadow: "2xl",
                borderColor: "gray.200"
            }}
            border="1px"
            borderColor="transparent"
        >
            <Image
                height="300px"
                objectFit="cover"
                borderTopRadius="md"
                src={blogPreview.post_image}
                alt='Blog Preview'
                transition="all 0.3s ease-in-out"
            />
            <CardBody>
                <Heading as='h4' size='md' className="mb-3">
                    {blogPreview.title}
                </Heading>
                <Text>
                    {blogPreview.content_preview}
                </Text>
            </CardBody>

            <CardFooter justify='space-between' flexWrap='wrap' sx={{'& > button': {minW: '136px'}}}>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name={blogPreview.user_display_name} src={blogPreview.user_image}/>
                    <Box>
                        <Text> {blogPreview.user_display_name} </Text>
                    </Box>
                </Flex>
                <Button 
                    variant='outline'
                    transition="all 0.2s ease-in-out"
                    _hover={{
                        bg: "gray.50",
                        borderColor: "gray.400"
                    }}
                >
                    <Link className="w-full h-full flex items-center justify-center" href={`blog/${blogPreview.blog_id}`}>
                        Read
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}