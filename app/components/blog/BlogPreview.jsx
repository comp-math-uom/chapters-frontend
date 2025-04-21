import { Avatar, Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";


export default function BlogPreview({blogPreview}) {
    return (
        <Card maxW='sm' className="mt-10" boxShadow='md'>
            <Image
                height="300px"
                objectFit="cover"
                borderTopRadius="md"
                src={blogPreview.coverImage}
                alt='Chakra UI'
            />
            <CardBody>
                <Heading as='h4' size='md' className="mb-3">
                    {blogPreview.title}
                </Heading>
                <Text>
                    {blogPreview.description}
                </Text>
            </CardBody>

            <CardFooter justify='space-between' flexWrap='wrap' sx={{'& > button': {minW: '136px'}}}>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name='Segun Adebayo' src={blogPreview.avatar}/>
                    <Box>
                        <Text> {blogPreview.author} </Text>
                    </Box>
                </Flex>
                <Button variant='outline'>
                    <Link href={blogPreview.link}>
                        Read
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}