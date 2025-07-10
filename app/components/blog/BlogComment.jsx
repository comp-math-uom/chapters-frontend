import { 
    Box, 
    Button,
    VStack, 
    HStack, 
    Avatar, 
    Text,
    Textarea,
    useToast,
    Divider,
    Flex,
} from '@chakra-ui/react';
import { ChevronRightIcon, TimeIcon } from '@chakra-ui/icons';
import { BiReply } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import blogService from "@/app/lib/services/blogService";

// Accepts a list of comments as a prop. setComments is optional (for controlled components)
export default function BlogComment({ comments = [], setComments, blogId, user_id }) {
    const [comment, setComment] = useState('');
    const [profilePic, setProfilePic] = useState();
    const [username, setUsername] = useState();
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);
    const toast = useToast();

    const MAX_COMMENT_LENGTH = 500;
    const MAX_REPLY_LENGTH = 300;

    useEffect(() => {
        let un = localStorage.getItem("username") || "Anonymous User";
        let pp = localStorage.getItem("profilePic") || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
        setUsername(un);
        setProfilePic(pp);
    }, []);

    const formatTime = (timeString) => {
        if (timeString === "now") return "Just now";
        // Add more sophisticated time formatting here
        return timeString;
    };

    const handleAddComment = async () => {
        if (!comment.trim()) {
            toast({
                title: "Empty comment",
                description: "Please write something before posting.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (comment.length > MAX_COMMENT_LENGTH) {
            toast({
                title: "Comment too long",
                description: `Please keep your comment under ${MAX_COMMENT_LENGTH} characters.`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsSubmitting(true);
        try {
            // Prepare comment data for API
            const commentData = {
                text: comment,
                blogPost_id: blogId,
                user_id: user_id
            };
            
            // Call API to add comment
            const savedComment = await blogService.addBlogComment(commentData);
            // Add any missing fields for local display
            const newComment = {
                ...savedComment,
                replies: [],
                id: savedComment.id || Date.now(),
                time: savedComment.time || new Date().toLocaleString(),
            };
            setComments([newComment, ...comments]);
            setComment("");
            toast({
                title: "Comment posted!",
                description: "Your comment has been added successfully.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error posting comment",
                description: "Something went wrong. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReplyClick = (commentId) => {
        // Only allow one reply box at a time
        console.log(`Replying to comment ID: ${commentId}`);
        
        setReplyingTo(commentId);
        setReplyText('');
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
        setReplyText('');
    };

    const handleSubmitReply = async (parentCommentId) => {
        if (!replyText.trim()) {
            toast({
                title: "Empty reply",
                description: "Please write something before replying.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        
        if (replyText.length > MAX_REPLY_LENGTH) {
            toast({
                title: "Reply too long",
                description: `Please keep your reply under ${MAX_REPLY_LENGTH} characters.`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsSubmittingReply(true);
        
        try {
            const newReply = {
                id: Date.now(),
                name: username,
                username: username,
                text: replyText,
                time: new Date().toLocaleString(),
                likes: 0,
                avatar: profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
            
            toast({
                title: "Reply posted!",
                description: "Your reply has been added successfully.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error submitting reply:', error);
            toast({
                title: "Error posting reply",
                description: "Something went wrong. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsSubmittingReply(false);
        }
    };

    return (
        <Box width="full" marginTop={4} px={[4, 6, 8, 12]}>
            {/* Comments Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                    Comments ({Array.isArray(comments) ? comments.length : 0})
                </Text>
            </Flex>

            {/* Comment Input Section */}
            <Box 
                position="relative" 
                mb={8} 
                p={4} 
                borderRadius="lg" 
                bg="gray.50" 
                border="1px solid" 
                borderColor="gray.200"
                _focusWithin={{ borderColor: "blue.300", bg: "white" }}
                transition="all 0.2s"
            >
                <Text fontSize="sm" color="gray.600" mb={3}>
                    Share your thoughts
                </Text>
                <HStack spacing={4} align="flex-start">
                    <Avatar
                        name={username}
                        src={profilePic}
                        size="md"
                        ring="2px"
                        ringColor="gray.200"
                    />
                    <Box flex={1} position="relative">
                        <Textarea
                            placeholder="Write a thoughtful comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            size="md"
                            fontSize="sm"
                            focusBorderColor="blue.400"
                            borderRadius="md"
                            resize="vertical"
                            minH="80px"
                            maxLength={MAX_COMMENT_LENGTH}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                    handleAddComment();
                                }
                            }}
                        />
                        <Flex justify="space-between" align="center" mt={2}>
                            <Text fontSize="xs" color="gray.500">
                                {comment.length}/{MAX_COMMENT_LENGTH} characters
                            </Text>
                            <HStack spacing={2}>
                                <Text fontSize="xs" color="gray.400">
                                    Ctrl+Enter to post
                                </Text>
                                <Button
                                    size="sm"
                                    bg="black"
                                    color="white"
                                    _hover={{bg: "gray.800"}}
                                    _disabled={{bg: "gray.300"}}
                                    onClick={handleAddComment}
                                    isLoading={isSubmitting}
                                    loadingText="Posting..."
                                    isDisabled={!comment.trim() || comment.length > MAX_COMMENT_LENGTH}
                                    leftIcon={<ChevronRightIcon />}
                                >
                                    Post
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>
                </HStack>
            </Box>

            {/* Comments List */}
            {(!comments || comments.length === 0) ? (
                <Box 
                    textAlign="center" 
                    py={12} 
                    color="gray.500"
                    bg="gray.50"
                    borderRadius="lg"
                    border="1px dashed"
                    borderColor="gray.300"
                >
                    <Text fontSize="lg" mb={2}>No comments yet</Text>
                    <Text fontSize="sm">Be the first to share your thoughts!</Text>
                </Box>
            ) : (
                <VStack spacing={6} align="stretch">
                    {comments.map((commentItem, index) => (
                        <Box 
                            key={commentItem.id || index} 
                            position="relative"
                            p={4}
                            borderRadius="lg"
                            bg="white"
                            border="1px solid"
                            borderColor="gray.200"
                            _hover={{ borderColor: "gray.300", shadow: "sm" }}
                            transition="all 0.2s"
                        >
                            <HStack align="flex-start" spacing={4}>
                                <Avatar
                                    name={commentItem.name}
                                    src={commentItem.avatar}
                                    size="md"
                                    ring="2px"
                                    ringColor="gray.100"
                                />
                                <Box flex={1}>                                    
                                    <Text fontSize="sm" lineHeight="1.6" mb={3} color="gray.700">
                                        {commentItem.text}
                                    </Text>

                                    <HStack spacing={4} align="center">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            color="gray.500"
                                            fontSize="sm"
                                            fontWeight="normal"
                                            leftIcon={<BiReply />}
                                            _hover={{ bg: "gray.100", color: "gray.600" }}
                                            onClick={() => handleReplyClick(commentItem.comment_id)}
                                        >
                                            Reply
                                        </Button>
                                    </HStack>

                                    {/* Reply Input Section */}
                                    {replyingTo === commentItem.comment_id && (
                                        <Box 
                                            mt={4} 
                                            p={3} 
                                            borderRadius="md" 
                                            bg="gray.50" 
                                            border="1px solid" 
                                            borderColor="gray.200"
                                        >
                                            <HStack spacing={3} align="flex-start">
                                                <Avatar
                                                    name={username}
                                                    src={profilePic}
                                                    size="sm"
                                                />
                                                <VStack spacing={3} flex={1} align="stretch">
                                                    <Textarea
                                                        placeholder={`Reply to ${commentItem.name}...`}
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        size="sm"
                                                        fontSize="sm"
                                                        focusBorderColor="blue.400"
                                                        borderRadius="md"
                                                        minH="60px"
                                                        maxLength={MAX_REPLY_LENGTH}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                                                handleSubmitReply(commentItem.id);
                                                            }
                                                        }}
                                                    />
                                                    <Flex justify="space-between" align="center">
                                                        <Text fontSize="xs" color="gray.500">
                                                            {replyText.length}/{MAX_REPLY_LENGTH}
                                                        </Text>
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
                                                                _disabled={{bg: "gray.300"}}
                                                                onClick={() => handleSubmitReply(commentItem.id)}
                                                                isLoading={isSubmittingReply}
                                                                loadingText="Replying..."
                                                                isDisabled={!replyText.trim() || replyText.length > MAX_REPLY_LENGTH}
                                                            >
                                                                Reply
                                                            </Button>
                                                        </HStack>
                                                    </Flex>
                                                </VStack>
                                            </HStack>
                                        </Box>
                                    )}

                                    {/* Display Replies */}
                                    {commentItem.replies && commentItem.replies.length > 0 && (
                                        <Box mt={4}>
                                            <Divider mb={3} />
                                            <VStack spacing={4} align="stretch">
                                                {commentItem.replies.map((reply) => (
                                                    <Box 
                                                        key={reply.id}
                                                        p={3}
                                                        borderRadius="md"
                                                        bg="gray.50"
                                                        ml={4}
                                                    >
                                                        <HStack align="flex-start" spacing={3}>
                                                            <Avatar
                                                                name={reply.name}
                                                                src={reply.avatar}
                                                                size="sm"
                                                            />
                                                            <Box flex={1}>
                                                                <Flex justify="space-between" align="flex-start" mb={1}>
                                                                    <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                                                                        {reply.name}
                                                                    </Text>
                                                                    <HStack spacing={1} align="center">
                                                                        <TimeIcon w={2} h={2} color="gray.400" />
                                                                        <Text fontSize="xs" color="gray.500">
                                                                            {formatTime(reply.time)}
                                                                        </Text>
                                                                    </HStack>
                                                                </Flex>
                                                                <Text fontSize="sm" lineHeight="1.5" color="gray.700">
                                                                    {reply.text}
                                                                </Text>
                                                            </Box>
                                                        </HStack>
                                                    </Box>
                                                ))}
                                            </VStack>
                                        </Box>
                                    )}
                                </Box>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            )}
        </Box>
    );
}