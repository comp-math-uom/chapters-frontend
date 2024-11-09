import {useEffect, useState} from "react";
import {Box, Heading, Text, VStack, Button, HStack, Avatar} from '@chakra-ui/react';
import {feedbackService} from "@/app/services/feedbackService";

export default function FeedbackSection({isAdmin = false, as = "h2", size = "xl"}) {
    const [feedbacks, setFeedbacks] = useState([]);

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

    const handleDelete = (feedbackId) => {
        // Implement delete functionality here
        console.log("Delete feedback:", feedbackId);
    };

    return (
        <div>
            <Heading as={as} size={size} mb={6}>Feedbacks</Heading>
            <hr />
            <VStack spacing={0} align="stretch">
                {feedbacks.map((feedback, index) => (
                    <Box
                        key={feedback.id}
                        p={4}
                    >
                        <HStack justify="space-between" mb={2}>
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
                                onClick={() => handleDelete(feedback.id)}
                            >
                                Delete Feedback
                            </Button>}
                        </HStack>
                        <Text pl={10} mb={5}>{feedback.content}</Text>
                        {index !== feedbacks.length - 1 && <hr/>}
                    </Box>
                ))}
            </VStack>
        </div>
    );
}