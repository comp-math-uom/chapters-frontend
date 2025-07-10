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
    IconButton,
    useDisclosure
} from '@chakra-ui/react';
import { ChevronRightIcon, TimeIcon, EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { BiReply } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import blogService from "@/app/lib/services/blogService";
import DeleteConfirmModal from "@/app/components/common/DeleteConfirmModal";

// Accepts a list of comments as a prop. setComments is optional (for controlled components)
export default function BlogComment({ comments = [], setComments, blogId, user_id }) {
    // For editing comments/replies
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editReplyText, setEditReplyText] = useState('');
    // For delete confirmation
    const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'comment'|'reply', commentId, replyId? }
    const { isOpen, onOpen, onClose } = useDisclosure();
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
    // Helper: check if current user is the author
    const isAuthor = (itemUserId) => {
        return String(itemUserId) === String(user_id);
    };

    // Delete comment
    const handleDeleteComment = async (commentId) => {
        try {
            await blogService.deleteBlogComment(commentId);
            setComments(comments.filter(c => c.comment_id !== commentId));
            toast({
                title: "Comment deleted!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error deleting comment",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Delete reply
    const handleDeleteReply = async (replyId, commentId) => {
        try {
            console.log(`Deleting reply with ID: ${replyId} for user ${user_id}`);
            
            await blogService.deleteCommentReply(replyId, user_id);
            const updatedComments = comments.map(comment => {
                if (comment.comment_id === commentId) {
                    return {
                        ...comment,
                        replies: (comment.replies || []).filter(r => r.reply_id !== replyId)
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            toast({
                title: "Reply deleted!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error deleting reply",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Edit comment
    const handleEditComment = (comment) => {
        setEditingCommentId(comment.comment_id);
        setEditText(comment.text);
    };
    const handleEditReply = (reply) => {
        setEditingReplyId(reply.id);
        setEditReplyText(reply.text);
    };

    const handleSaveEditComment = async (commentId) => {
        try {
            const updated = await blogService.updateComment(commentId, { text: editText }, user_id);
            const updatedComments = comments.map(comment =>
                comment.comment_id === commentId ? { ...comment, text: editText } : comment
            );
            setComments(updatedComments);
            setEditingCommentId(null);
            setEditText('');
            toast({
                title: "Comment updated!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error updating comment",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };
    const handleSaveEditReply = async (commentId, replyId) => {
        try {
            await blogService.updateCommentReply(replyId, {text: editReplyText}, user_id);
            const updatedComments = comments.map(comment => {
                if (comment.comment_id === commentId) {
                    return {
                        ...comment,
                        replies: (comment.replies || []).map(r =>
                             r.reply_id === replyId ? { ...r, text: editReplyText } : r
                        )
                    };
                }
                return comment;
            });
            setComments(updatedComments);
            setEditingReplyId(null);
            setEditReplyText('');
            toast({
                title: "Reply updated!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error updating reply",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // Delete confirmation modal
    const openDeleteModal = (target) => {
        setDeleteTarget(target);        
        onOpen();
    };
    const confirmDelete = () => {
        if (deleteTarget) {
            if (deleteTarget.type === 'comment') {
                handleDeleteComment(deleteTarget.commentId);
            } else if (deleteTarget.type === 'reply') {
                handleDeleteReply(deleteTarget.replyId, deleteTarget.commentId);
            }
        }
        onClose();
        setDeleteTarget(null);
    };
    const cancelDelete = () => {
        onClose();
        setDeleteTarget(null);
    };

    useEffect(() => {
        let un = localStorage.getItem("username") || "Anonymous User";
        let pp = localStorage.getItem("profilePic") || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
        setUsername(un);
        setProfilePic(pp);
    }, []);

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const now = new Date();
        const diff = now - date;    
        if (diff < 60000) return "Just now"; // less than a minute
        if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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
            // Prepare reply data
            const replyPayload = {
                text: replyText,
                user_id: user_id,
                parentContent_id: parentCommentId
            };
            // Save reply via API
            const savedReply = await blogService.addCommentReply(replyPayload);
            // Add any missing fields for local display
            const newReply = {
                ...savedReply,
                id: savedReply.id || Date.now(),
                time: savedReply.time || new Date().toLocaleString(),
                name: username,
                avatar: profilePic
            };
            // Update local state: add reply to the correct comment
            const updatedComments = comments.map(comment => {
                // Support both id and comment_id for matching
                if (comment.comment_id === parentCommentId) {
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
                            key={commentItem.comment_id || index} 
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
                                    name={commentItem.name || "Anonymous"}
                                    src={commentItem.avatar}
                                    size="md"
                                    ring="2px"
                                    ringColor="gray.100"
                                />
                                <Box flex={1}>                                    

                                    {editingCommentId === commentItem.comment_id ? (
                                        <Box mb={3}>
                                            <Textarea
                                                value={editText}
                                                onChange={e => setEditText(e.target.value)}
                                                size="sm"
                                                fontSize="sm"
                                                borderRadius="md"
                                                minH="60px"
                                                maxLength={MAX_COMMENT_LENGTH}
                                            />
                                            <Flex justify="flex-end" align="center" mt={2} gap={2}>
                                                <Button
                                                    size="sm"
                                                    bg="black"
                                                    color="white"
                                                    _hover={{ bg: "gray.800" }}
                                                    onClick={() => handleSaveEditComment(commentItem.comment_id)}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    color="gray.500"
                                                    _hover={{ bg: "gray.100" }}
                                                    size="sm"
                                                    onClick={() => { setEditingCommentId(null); setEditText(''); }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Flex>
                                        </Box>
                                    ) : (
                                        <Text fontSize="sm" lineHeight="1.6" mb={3} color="gray.700">
                                            {commentItem.text}
                                        </Text>
                                    )}

                                    <HStack spacing={2} align="center">
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
                                        {isAuthor(commentItem.user_id) && (
                                            <>
                                                <IconButton
                                                    icon={<EditIcon />}
                                                    size="sm"
                                                    aria-label="Edit comment"
                                                    variant="ghost"
                                                    color="gray.500"
                                                    _hover={{ color: "blue.500", bg: "gray.100" }}
                                                    onClick={() => handleEditComment(commentItem)}
                                                />
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    size="sm"
                                                    aria-label="Delete comment"
                                                    variant="ghost"
                                                    color="red.400"
                                                    _hover={{ color: "red.600", bg: "gray.100" }}
                                                    onClick={() => openDeleteModal({ type: 'comment', commentId: commentItem.comment_id })}
                                                />
                                            </>
                                        )}
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
                                                        placeholder={`Reply to ${commentItem.name || "Anonymous"}...`}
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
                                                                handleSubmitReply(commentItem.comment_id);
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
                                                                onClick={() => handleSubmitReply(commentItem.comment_id)}
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
                                                                name={reply.name || "Anonymous"}
                                                                src={reply.avatar}
                                                                size="sm"
                                                            />
                                                            <Box flex={1}>
                                                                <Flex justify="space-between" align="flex-start" mb={1}>
                                                                    <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                                                                        {reply.name || "Anonymous"}
                                                                    </Text>
                                                                    <HStack spacing={1} align="center">
                                                                        <TimeIcon w={2} h={2} color="gray.400" />
                                                                        <Text fontSize="xs" color="gray.500">
                                                                            {formatTime(reply.repliedAt)}
                                                                        </Text>
                                                                        {isAuthor(reply.user_id) && (
                                                                            <>
                                                                                <IconButton
                                                                                    icon={<EditIcon />}
                                                                                    size="xs"
                                                                                    aria-label="Edit reply"
                                                                                    variant="ghost"
                                                                                    color="gray.500"
                                                                                    _hover={{ color: "blue.500", bg: "gray.100" }}
                                                                                    onClick={() => handleEditReply(reply, commentItem.comment_id)}
                                                                                />
                                                                                <IconButton
                                                                                    icon={<DeleteIcon />}
                                                                                    size="xs"
                                                                                    aria-label="Delete reply"
                                                                                    variant="ghost"
                                                                                    color="red.400"
                                                                                    _hover={{ color: "red.600", bg: "gray.100" }}
                                                                                    onClick={() => openDeleteModal({ type: 'reply', commentId: commentItem.comment_id, replyId: reply.reply_id })}
                                                                                />
                                                                            </>
                                                                        )}
                                                                    </HStack>
                                                                </Flex>
                                                                {editingReplyId === reply.id ? (
                                                                    <Box mb={2}>
                                                                        <Textarea
                                                                            value={editReplyText}
                                                                            onChange={e => setEditReplyText(e.target.value)}
                                                                            size="sm"
                                                                            fontSize="sm"
                                                                            borderRadius="md"
                                                                            minH="40px"
                                                                            maxLength={MAX_REPLY_LENGTH}
                                                                            flex={1}
                                                                        />
                                                                        <Flex justify="flex-end" align="center" mt={2} gap={2}>                                                                        
                                                                            <Button
                                                                                size="sm"
                                                                                bg="black"
                                                                                color="white"
                                                                                _hover={{ bg: "gray.800" }}
                                                                                onClick={() => handleSaveEditReply(commentItem.comment_id, reply.reply_id)}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                            <Button
                                                                                variant="ghost"
                                                                                color="gray.500"
                                                                                _hover={{ bg: "gray.100" }}
                                                                                size="sm"
                                                                                onClick={() => { setEditingReplyId(null); setEditReplyText(''); }}
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                        </Flex>
                                                                    </Box>
                                                                ) : (
                                                                    <Text fontSize="sm" lineHeight="1.5" color="gray.700">
                                                                        {reply.text}
                                                                    </Text>
                                                                )}
                                                            </Box>
                                                        </HStack>
                                                    </Box>
                                                ))}
            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={isOpen}
                onClose={cancelDelete}
                onDelete={confirmDelete}
                message={deleteTarget?.type === 'comment' ? "Are you sure you want to delete this comment?" : "Are you sure you want to delete this reply?"}
            />
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