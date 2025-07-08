"use client";

import { useEffect, useState } from "react";
import { Avatar, Box, Button, Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { feedbackService } from "@/app/lib/services/feedbackService";
import DeleteConfirmModal from "@/app/components/common/DeleteConfirmModal";

export default function FeedbackSection({isAdmin = false, as = "h2", size = "xl"}) {
    const [feedbacks, setFeedbacks] = useState([]);
    const {isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal} = useDisclosure();
    const [feedbackToDelete, setFeedbackToDelete] = useState(null);

    useEffect(() => {
        const loadFeedBacks = async () => {
            try {
                const data = await feedbackService.fetchFeedbacks();
                setFeedbacks(data);
            } catch (error) {
                console.error("Error loading feedbacks:", error);
            }
        };
        loadFeedBacks();
    }, []);

    const handleDeleteConfirm = () => {
        if (feedbackToDelete) {
            // Implement delete functionality here
            console.log("Delete feedback:", feedbackToDelete.id);
            setFeedbackToDelete(null);
            onCloseDeleteModal();
        }
    };

    const handleDeleteClick = (feedback) => {
        setFeedbackToDelete(feedback);
        onOpenDeleteModal();
    };

    return (
        <div>
            <Heading as={as} size={size} mb={6}>Feedbacks</Heading>
            <hr/>
            <VStack spacing={0} align="stretch">
                {feedbacks.map((feedback, index) => (
                    <Box
                        key={feedback.id}
                        p={4}
                    >
                        <HStack
                            justify={{ base: "flex-start", md: "space-between" }}
                            alignItems={{ base: "flex-start", md: "center" }}
                            flexDirection={{ base: "column", md: "row" }}
                            mb={2}
                        >
                            <HStack spacing={3}>
                                <Avatar
                                    size="sm"
                                    name={feedback.userName}
                                    src={feedback.userAvatar}
                                />
                                <VStack align="start" spacing={0}>
                                    <Text fontWeight="bold">{feedback.userName}</Text>
                                    <Text fontSize="sm" color="gray.500">{feedback.timeAgo}</Text>
                                </VStack>
                            </HStack>
                            {isAdmin && <Button
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => handleDeleteClick(feedback)}
                                mt={{ base: 2, md: 0 }}
                            >
                                Delete Feedback
                            </Button>}
                        </HStack>
                        <Text pl={{ base: 0, md: 10 }} mb={5}>{feedback.content}</Text>
                        {index !== feedbacks.length - 1 && <hr/>}
                    </Box>
                ))}
            </VStack>
            <DeleteConfirmModal
                isOpen={isOpenDeleteModal}
                onClose={onCloseDeleteModal}
                onDelete={handleDeleteConfirm}
                itemToDelete={feedbackToDelete}
            />
        </div>
    );
}