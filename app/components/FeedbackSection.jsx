import {useEffect, useState} from "react";
import portfolioService, {feedbackService} from "@/app/services/portfolioService";
import {Box, Heading, Text, VStack, Container, Button, HStack, Avatar} from '@chakra-ui/react';

const FeedbackSection = () => {
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
            <Heading mb={6}>Feedbacks</Heading>
            <VStack spacing={4} align="stretch">
                {feedbacks.map((feedback) => (
                    <Box
                        key={feedback.id}
                        p={4}
                        borderBottomWidth="1px"
                        borderColor="gray.200"
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
                            <Button
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => handleDelete(feedback.id)}
                            >
                                Delete Feedback
                            </Button>
                        </HStack>
                        <Text pl={10}>{feedback.content}</Text>
                    </Box>
                ))}
            </VStack>
        </div>
    );
};

export default FeedbackSection;