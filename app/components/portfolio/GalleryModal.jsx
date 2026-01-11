"use client";

import React, { useEffect, useRef, useState } from "react";
import { useKeycloak } from '@/app/providers/Providers';
import {
    Avatar,
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { ChevronRightIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ContributorsList from "@/app/components/portfolio/ContributorsList";
import contributors from "@/app/data/contributors";
import Link from "next/link";
import FeedbackSection from "@/app/components/portfolio/FeedbackSection";
import DeleteConfirmModal from "@/app/components/common/DeleteConfirmModal";
import portfolioService from "@/app/lib/services/portfolioService";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";
import { feedbackService } from "@/app/lib/services/feedbackService";

export default function GalleryModal({ isOpen, onClose, galleryItem, isAdmin = false }) {
    const { keycloak } = useKeycloak();
    const [profilePic, setProfilePic] = useState();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [imageHeight, setImageHeight] = useState(null);
    const imageRef = useRef(null);
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleAddComment = async () => {
        if (comment.trim()) {
            const username = keycloak?.tokenParsed?.preferred_username || keycloak?.tokenParsed?.email || "Anonymous";
            const feedbackData = {
                content: comment,
                username: username
            };

            try {
                const response = await feedbackService.createFeedback(galleryItem.id, feedbackData);

                const newComment = {
                    id: response?.id || Date.now(),
                    userName: username,
                    userAvatar: profilePic,
                    timeAgo: "Just now",
                    content: comment
                };

                setComments([...comments, newComment]);
                setComment("");
            } catch (error) {
                console.error("Failed to submit feedback", error);
                setModalMessage("Failed to submit feedback. Please try again.");
                setIsErrorModalOpen(true);
            }
        }
    };

    const onClickDelete = (itemId) => {
        console.log(`Opening delete modal for ID: ${itemId}`);
        setItemToDelete(itemId);
        onOpenDelete();
    };

    const handleDelete = async () => {
        try {
            const response = await portfolioService.deleteGalleryItem(itemToDelete);
            if (response.status === 200 || response.status === 204) {
                setModalMessage("Post deleted successfully!");
                setIsSuccessModalOpen(true);
            } else {
                setModalMessage("Failed to delete the post. Please try again.");
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            setModalMessage("Failed to delete the post. Please try again.");
            setIsErrorModalOpen(true);
        }
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        onClose();
    };

    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current.clientHeight);
        }
    }, [galleryItem]);

    useEffect(() => {
        setProfilePic(keycloak?.tokenParsed?.picture);
    }, [keycloak]);

    useEffect(() => {
        if (!isOpen) {
            setComments([]);
            setComment("");
        }
    }, [isOpen]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "5xl" }} closeOnOverlayClick={true} isCentered>
                <ModalOverlay />
                <ModalContent maxW={{ base: "100%", md: "83vw" }} w={{ base: "100%", md: "83vw" }} maxH={{ base: "100vh", md: "80vh" }}>
                    <ModalBody display="flex" flexDirection={{ base: "column", md: "row" }} padding={0} maxHeight={{ base: "100vh", md: "80vh" }}>
                        <Box
                            flex={{ base: "none", md: 1 }}
                            maxHeight={{ base: "40vh", md: "80vh" }}
                            position="relative"
                        >
                            <Image
                                ref={imageRef}
                                src={galleryItem.src}
                                alt={galleryItem.topic}
                                roundedTopStart={"md"}
                                objectFit="contain"
                                w="100%"
                                h="100%"
                                onLoad={() => setImageHeight(imageRef.current.clientHeight)}
                            />
                        </Box>
                        <Box flex={1} px={2} height={{ base: "60vh", md: "80vh" }}>
                            <HStack className={isAdmin ? "flex justify-between mt-2" : "flex justify-end mt-2"} paddingLeft={4}>
                                {isAdmin &&
                                    <Flex gap={2}>
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='Delete'
                                            onClick={() => onClickDelete(galleryItem.id)}
                                            icon={<DeleteIcon />}
                                        />
                                        <Link href={`/portfolio/edit-item/${galleryItem.id}`}>
                                            <IconButton
                                                variant='ghost'
                                                colorScheme='gray'
                                                aria-label='Edit'
                                                icon={<EditIcon />}
                                            />
                                        </Link>
                                    </Flex>
                                }
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='Close'
                                    onClick={onClose}
                                    icon={<CloseIcon />}
                                />
                            </HStack>
                            <Box flex={1} px={7} overflowY="auto" maxHeight="calc(80vh - 60px)" overflowX="clip">
                                <ModalHeader pl={0}>{galleryItem.topic}</ModalHeader>
                                <Text mb={4} textAlign="justify">
                                    {galleryItem.description || "No description available."}
                                </Text>

                                <ContributorsList contributors={contributors} />

                                <Flex gap={3} className="my-10" alignItems="center">
                                    <Avatar
                                        src={profilePic}
                                        name={keycloak?.tokenParsed?.preferred_username || keycloak?.tokenParsed?.email || "John Doe"}
                                    />
                                    <InputGroup size='md' borderRadius="lg">
                                        <Input
                                            _focus={{
                                                bg: "#e2e8f0",
                                                borderColor: "transparent"
                                            }}
                                            borderRadius="full"
                                            variant='filled'
                                            placeholder='Leave a comment'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                borderRadius="full"
                                                bg="black"
                                                color="white"
                                                size='xs'
                                                icon={<ChevronRightIcon />}
                                                onClick={handleAddComment}
                                                aria-label="send"
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                </Flex>

                                <FeedbackSection as="h6" size="xs" additionalFeedbacks={comments} projectId={galleryItem.id} />


                            </Box>
                        </Box>
                        <ErrorModal
                            isOpen={isErrorModalOpen}
                            onClose={() => setIsErrorModalOpen(false)}
                            errorMessage={modalMessage}
                        />
                        <SuccessModal
                            isOpen={isSuccessModalOpen}
                            onClose={handleSuccessModalClose}
                            successMessage={modalMessage}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <DeleteConfirmModal isOpen={isOpenDelete} onClose={onCloseDelete} onDelete={handleDelete} />
        </>
    );
};
