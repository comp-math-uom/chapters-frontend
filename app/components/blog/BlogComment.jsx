import { Box, Button, Group, Input, VStack, HStack, Avatar, Text, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { BiComment, BiLike } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import blogService from "@/app/lib/services/blogService";

export default function BlogComment({comments,setComments}) {
    const [comment, setComment] = useState('');
    const [profilePic, setProfilePic] = useState();
    const [username, setUsername] = useState();
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

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
            avatar: profilePic || "/api/placeholder/40/40",
            replies: []
        };
        setComments([newComment, ...comments]);
        setComment("");
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
        setReplyText('');
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
        setReplyText('');
    };

    const handleSubmitReply = async (parentCommentId) => {
        if (!replyText.trim()) return;
        
        try {
            const newReply = {
                id: Date.now(),
                name: username,
                username: username,
                text: replyText,
                time: "now",
                likes: 0,
                avatar: profilePic || "/api/placeholder/40/40",
                parentId: parentCommentId
            };

            // Call blogService method to save the reply
            await blogService.addCommentReply(parentCommentId, newReply);

            // Update local state
            const updatedComments = comments.map(comment => {
                if (comment.id === parentCommentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), newReply]
                    };
                }
                return comment;
            });
            
            setComments(updatedComments);
            setReplyingTo(null);
            setReplyText('');
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
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
                                        onClick={() => handleReplyClick(commentItem.id)}
                                    >
                                        Reply
                                    </Button>
                                </HStack>

                                {/* Reply Input Section */}
                                {replyingTo === commentItem.id && (
                                    <Box mt={4} pl={0}>
                                        <HStack spacing={3} align="flex-start">
                                            <Avatar
                                                name={username}
                                                src={profilePic}
                                                size="sm"
                                            />
                                            <VStack spacing={3} flex={1} align="stretch">
                                                <Input
                                                    placeholder={`Reply to ${commentItem.name}...`}
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    size="sm"
                                                    fontSize="sm"
                                                    focusBorderColor="gray.400"
                                                    borderRadius="md"
                                                />
                                                <HStack spacing={2}>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={handleCancelReply}
                                                        color="gray.500"
                                                        _hover={{ bg: "gray.100" }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        bg="black"
                                                        color="white"
                                                        _hover={{ bg: "gray.800" }}
                                                        onClick={() => handleSubmitReply(commentItem.id)}
                                                        isDisabled={!replyText.trim()}
                                                    >
                                                        Reply
                                                    </Button>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                )}

                                {/* Display Replies */}
                                {commentItem.replies && commentItem.replies.length > 0 && (
                                    <Box mt={4} pl={0}>
                                        <VStack spacing={4} align="stretch">
                                            {commentItem.replies.map((reply) => (
                                                <HStack key={reply.id} align="flex-start" spacing={3}>
                                                    <Avatar
                                                        name={reply.name}
                                                        src={reply.avatar}
                                                        size="sm"
                                                    />
                                                    <Box flex={1}>
                                                        <Text fontSize="xs" fontWeight="semibold" color="gray.800">
                                                            {reply.name}
                                                        </Text>
                                                        <Text fontSize="xs" lineHeight="1.5" color="gray.700">
                                                            {reply.text}
                                                        </Text>
                                                        <Text fontSize="xs" color="gray.400" mt={1}>
                                                            {reply.time}
                                                        </Text>
                                                    </Box>
                                                </HStack>
                                            ))}
                                        </VStack>
                                    </Box>
                                )}
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