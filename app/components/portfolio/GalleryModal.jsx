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
                                        <Link href={`/portfolio/projects/edit-item/${galleryItem.id}`}>
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

                                {/* Metadata row — batch, date, hidden badge for admins */}
                                <HStack spacing={3} mb={3} flexWrap="wrap">
                                    {galleryItem.batch && (
                                        <Badge colorScheme="purple" variant="subtle" textTransform="uppercase">
                                            {galleryItem.batch}
                                        </Badge>
                                    )}
                                    {galleryItem.date && (
                                        <HStack spacing={1} color="gray.600" fontSize="sm">
                                            <CalendarIcon boxSize={3} />
                                            <Text>{new Date(galleryItem.date).toLocaleDateString()}</Text>
                                        </HStack>
                                    )}
                                    {galleryItem.visible === false && (
                                        <Badge colorScheme="red" variant="subtle">HIDDEN</Badge>
                                    )}
                                </HStack>

                                <Text mb={4} textAlign="justify">
                                    {galleryItem.description || "No description available."}
                                </Text>

                                <ContributorsList contributors={galleryItem.contributors || []} />

                                {galleryItem.searchTags?.length > 0 && (
                                    <Box mt={4}>
                                        <Text fontSize="xs" color="gray.500" mb={2} fontWeight="bold">TAGS</Text>
                                        <Wrap spacing={2}>
                                            {galleryItem.searchTags.map((tag) => (
                                                <WrapItem key={tag}>
                                                    <Tag size="sm" variant="outline" colorScheme="gray">
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
