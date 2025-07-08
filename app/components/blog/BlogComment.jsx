import { Box, Button, Group, Input, VStack, HStack, Avatar, Text, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { BiComment, BiLike } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import blogService from "@/app/lib/services/blogService";

export default function BlogComment({comments,setComments}) {
    const [comment, setComment] = useState('');
    const [profilePic, setProfilePic] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        let un = localStorage.getItem("username") || "John Doe";
        let pp = localStorage.getItem("profilePic") || "https://bit.ly/broken-link";
        setUsername(un);
        setProfilePic(pp);
    }, []);

    const handleAddComment = () => {
        if (!comment.trim()) return;
        const newComment = {
            id: Date.now(),
            name: username,
            username: username,
            text: comment,
            time: "now",
            likes: 0,
            avatar: profilePic || "/api/placeholder/40/40"
        };
        setComments([newComment, ...comments]);
        setComment("");
    };

    return (
        <Box width="full" marginTop={-6} px={[4, 8, 12, 20]}>

            {/* Comment Input Section */}
            <Box position="relative" mb={8}>
                <HStack spacing={4}>
                    <Avatar
                        name={username}
                        src={profilePic}
                        size="md"
                    />
                    <Input
                        placeholder="Add your comments here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        size="md"
                        fontSize="sm"
                        focusBorderColor="gray.400"
                        borderRadius="lg"
                        p={5}
                    />
                    <IconButton
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right={2}
                        top="50%"
                        transform="translateY(-50%)"
                        bg="black"
                        color="white"
                        borderRadius="lg"
                        size="sm"
                        zIndex={2}
                        _hover={{bg: "gray.800"}}
                        aria-label="Submit comment"
                        onClick={handleAddComment}
                    />
                </HStack>
            </Box>

            {/* Comments List */}
            <VStack spacing={6} align="stretch">
                {comments.map((commentItem, index) => (
                    <Box key={commentItem.id} position="relative">
                        <HStack align="flex-start" spacing={4}>
                            <Avatar
                                name={commentItem.name}
                                src={commentItem.avatar}
                                size="md"
                            />
                            <Box flex={1}>
                                <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                                        {commentItem.name}
                                </Text>
                                <Text fontSize="sm"  lineHeight="1.6" mb={2}>
                                    {commentItem.text}
                                </Text>

                                <HStack spacing={4} align="center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        color="gray.500"
                                        fontSize="sm"
                                        fontWeight="normal"
                                        p={0}
                                        h="auto"
                                        _hover={{ bg: "transparent", color: "gray.600" }}
                                    >
                                        Reply
                                    </Button>
                                </HStack>
                            </Box>

                        </HStack>

                        {/* Vertical line connecting comments */}
                        {index < comments.length - 1 && (
                            <Box
                                position="absolute"
                                left="20px"
                                top="60px"
                                bottom="-24px"
                                width="1px"
                                bg="gray.200"
                            />
                        )}
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}