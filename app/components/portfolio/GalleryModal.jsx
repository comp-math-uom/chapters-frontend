"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from '@/app/providers/Providers';
import {
    Badge,
    Box,
    Flex,
    HStack,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tag,
    Text,
    useDisclosure,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { CalendarIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ContributorsList from "@/app/components/portfolio/ContributorsList";
import Link from "next/link";
import DeleteConfirmModal from "@/app/components/common/DeleteConfirmModal";
import portfolioService from "@/app/lib/services/portfolioService";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";

export default function GalleryModal({ isOpen, onClose, galleryItem }) {
    const { auth } = useAuth();
    const isAdmin = auth?.role === 'admin';
    const imageRef = useRef(null);
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const onClickDelete = (itemId) => {
        setItemToDelete(itemId);
        onOpenDelete();
    };

    const handleDelete = async () => {
        try {
            const response = await portfolioService.deleteGalleryItem(itemToDelete);
            if (response.status === 200 || response.status === 204) {
                setModalMessage("Project deleted successfully!");
                setIsSuccessModalOpen(true);
            } else {
                setModalMessage("Failed to delete the project. Please try again.");
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            setModalMessage("Failed to delete the project. Please try again.");
            setIsErrorModalOpen(true);
        }
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalOpen(false);
        onClose();
    };

    useEffect(() => {
        // no-op: kept for layout effects in future
    }, [galleryItem]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "5xl" }} closeOnOverlayClick={true} isCentered>
                <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(2px)" />
                <ModalContent
                    maxW={{ base: "100%", md: "83vw" }}
                    w={{ base: "100%", md: "83vw" }}
                    maxH={{ base: "100vh", md: "80vh" }}
                    borderRadius={{ base: 0, md: "2xl" }}
                    overflow="hidden"
                    boxShadow="card-hover"
                >
                    <ModalBody display="flex" flexDirection={{ base: "column", md: "row" }} padding={0} maxHeight={{ base: "100vh", md: "80vh" }}>
                        <Box
                            flex={{ base: "none", md: 1 }}
                            maxHeight={{ base: "40vh", md: "80vh" }}
                            position="relative"
                            bg="slate.900"
                        >
                            <Image
                                ref={imageRef}
                                src={galleryItem.src}
                                alt={galleryItem.topic}
                                objectFit="contain"
                                w="100%"
                                h="100%"
                            />
                        </Box>
                        <Box flex={1} bg="white" height={{ base: "60vh", md: "80vh" }} display="flex" flexDirection="column">
                            <HStack
                                justify={isAdmin ? "space-between" : "flex-end"}
                                px={4}
                                py={3}
                                borderBottom="1px solid"
                                borderColor="slate.100"
                                flexShrink={0}
                            >
                                {isAdmin &&
                                    <Flex gap={1}>
                                        <IconButton
                                            variant='ghost'
                                            borderRadius="full"
                                            color="slate.600"
                                            _hover={{ bg: "slate.100" }}
                                            aria-label='Delete'
                                            onClick={() => onClickDelete(galleryItem.id)}
                                            icon={<DeleteIcon />}
                                        />
                                        <Link href={`/portfolio/projects/edit-item/${galleryItem.id}`}>
                                            <IconButton
                                                variant='ghost'
                                                borderRadius="full"
                                                color="slate.600"
                                                _hover={{ bg: "slate.100" }}
                                                aria-label='Edit'
                                                icon={<EditIcon />}
                                            />
                                        </Link>
                                    </Flex>
                                }
                                <IconButton
                                    variant='ghost'
                                    borderRadius="full"
                                    color="slate.600"
                                    _hover={{ bg: "slate.100" }}
                                    aria-label='Close'
                                    onClick={onClose}
                                    icon={<CloseIcon />}
                                />
                            </HStack>
                            <Box flex={1} px={7} py={5} overflowY="auto" overflowX="clip">
                                <ModalHeader p={0} mb={3} fontFamily="display" fontSize="2xl" color="slate.900" lineHeight="short">
                                    {galleryItem.topic}
                                </ModalHeader>

                                {/* Metadata row - batch, date, hidden badge for admins */}
                                <HStack spacing={3} mb={4} flexWrap="wrap">
                                    {galleryItem.batch && (
                                        <Badge colorScheme="primary" borderRadius="full" px={2} textTransform="uppercase">
                                            {galleryItem.batch}
                                        </Badge>
                                    )}
                                    {galleryItem.date && (
                                        <HStack spacing={1} color="slate.500" fontSize="sm">
                                            <CalendarIcon boxSize={3} />
                                            <Text>{new Date(galleryItem.date).toLocaleDateString()}</Text>
                                        </HStack>
                                    )}
                                    {galleryItem.visible === false && (
                                        <Badge colorScheme="red" borderRadius="full" px={2}>HIDDEN</Badge>
                                    )}
                                </HStack>

                                <Text mb={4} color="slate.600" lineHeight="tall">
                                    {galleryItem.description || "No description available."}
                                </Text>

                                <ContributorsList contributors={galleryItem.contributors || []} />

                                {galleryItem.searchTags?.length > 0 && (
                                    <Box mt={4}>
                                        <Text fontSize="xs" color="slate.500" mb={2} fontWeight="bold" letterSpacing="wider">TAGS</Text>
                                        <Wrap spacing={2}>
                                            {galleryItem.searchTags.map((tag) => (
                                                <WrapItem key={tag}>
                                                    <Tag size="sm" variant="subtle" colorScheme="slate" borderRadius="full">
                                                        {tag}
                                                    </Tag>
                                                </WrapItem>
                                            ))}
                                        </Wrap>
                                    </Box>
                                )}
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
