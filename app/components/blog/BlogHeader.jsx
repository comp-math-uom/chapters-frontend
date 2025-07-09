import { Avatar, Box, Flex, Heading, HStack, Text, VStack, Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { BiComment, BiLike, BiSolidLike } from 'react-icons/bi';
import { BsShare, BsThreeDots } from 'react-icons/bs';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DeleteConfirmModal from '@/app/components/common/DeleteConfirmModal';
import blogService from '@/app/lib/services/blogService';
import { useRouter } from 'next/navigation';

export default function BlogHeader({blog}) {
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(blog.likes_count || 0);
    const router = useRouter();
    const toast = useToast();
    const userId = '1'; //TODO: Replace with actual user ID from context or state

    const handleShare = async () => {
        try {
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);
            
            toast({
                title: "Link Copied!",
                description: "Blog URL has been copied to your clipboard.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            
            toast({
                title: "Copy Failed",
                description: "Failed to copy link to clipboard. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleLike = async () => {
        try {
            if (isLiked) {
                await blogService.likeBlog(blog.blog_id, userId, 0);
                setIsLiked(false);
                setLikesCount(likesCount - 1);
            } else {
                await blogService.likeBlog(blog.blog_id, userId);
                setIsLiked(true);
                setLikesCount(likesCount + 1);
            }
        } catch (error) {
            console.error('Error liking/unliking blog:', error);
            toast({
                title: "Action Failed",
                description: "Failed to like/unlike the blog. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            console.log('Deleting blog:', blog.blog_id);
            await blogService.deleteBlog(blog.blog_id);
            console.log('Blog deleted successfully');
            router.push('/blog');
        } catch (error) {
            console.error('Error deleting blog:', error);
        } finally {
            setIsDeleting(false);
            onDeleteClose();
        }
    };
    useEffect(() => {
        // Check if the user has liked the blog
        const checkIfLiked = async () => {
            try {
                // Assuming blogService has a method to check if the blog is liked by the user
                const liked = await blogService.isLikedByUser(blog.blog_id, userId);
                setIsLiked(liked);
            } catch (error) {
                console.error('Error checking if blog is liked:', error);
            }
        };

        checkIfLiked();
    }, [blog.blog_id]);

    return (
        <Box width={'full'} paddingTop={[6, 8, 12, 16]} px={[4, 8, 12, 20]}>
            <VStack spacing={2} align={"left"}>
                <Heading as="h1" size={["2xl", "3xl", "4xl"]} fontWeight="bold" className={'font-anton'}>
                    {blog.title}
                </Heading>
                <HStack spacing={2} mt={[3, 4, 5]} flexWrap="wrap">
                    <Avatar src={blog.user_image}/>
                    <VStack align={"left"}>
                        <HStack spacing={2} color="gray.700" fontSize={["md", "lg"]} flexWrap="wrap">
                            <Text>Written by {blog.user_display_name}</Text>
                            <Text>|</Text>
                            <Text>
                                {new Date(blog.postedAt).toLocaleDateString("en-US", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Text>
                        </HStack>
                        <Flex wrap="wrap" gap={2} marginTop={-3}>
                            {blog.tags.map((tag, index) => (
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
                <HStack marginTop={6} spacing={6} flexWrap="wrap" justify="space-between">
                    <HStack spacing={6}>
                        <HStack className="cursor-pointer hover:opacity-80" onClick={handleLike}>
                            {isLiked ? (
                                <BiSolidLike size={23} className="text-gray-600" />
                            ) : (
                                <BiLike size={23} className="text-gray-600" />
                            )}
                            <Text fontSize="sm" color="gray.600">{likesCount}</Text>
                        </HStack>                        
                        <HStack spacing={1}>
                            <BiComment size={23} className="text-gray-600"/>
                            <Text fontSize="sm" color="gray.600">12</Text>
                        </HStack>
                        <HStack spacing={1} className="cursor-pointer hover:opacity-80" onClick={handleShare}>
                            <BsShare size={20} className="text-gray-600"/>
                        </HStack>
                    </HStack>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<BsThreeDots />}
                            variant="ghost"
                            size="sm"
                            color="gray.600"
                            _hover={{ bg: "gray.100" }}
                        />
                        <MenuList>
                            <MenuItem icon={<EditIcon />}>
                                <Link href={`/blog/edit/${blog.id}`}>
                                    Edit
                                </Link>
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon />} onClick={onDeleteOpen}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </VStack>
            <DeleteConfirmModal 
                isOpen={isDeleteOpen} 
                onClose={onDeleteClose} 
                onDelete={handleDelete}
                isLoading={isDeleting}
            />
        </Box>
    )
}