"use client";

import {
    Badge, Box, Flex, HStack, IconButton, Image, Modal, ModalBody, ModalContent,
    ModalHeader, ModalOverlay, Tag, Text, useDisclosure, Wrap, WrapItem,
} from "@chakra-ui/react";
import { CalendarIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/providers/Providers";
import achievementService from "@/app/lib/services/achievementService";
import ContributorsList from "@/app/components/portfolio/ContributorsList";
import DeleteConfirmModal from "@/app/components/common/DeleteConfirmModal";
import ErrorModal from "@/app/components/common/ErrorModal";
import SuccessModal from "@/app/components/common/SuccessModal";

export default function AchievementModal({ isOpen, onClose, achievement, onDeleted }) {
    const { auth } = useAuth();
    const isAdmin = auth?.role === "admin";
    const { isOpen: delOpen, onOpen: openDel, onClose: closeDel } = useDisclosure();
    const [errMsg, setErrMsg] = useState("");
    const { isOpen: errOpen, onOpen: openErr, onClose: closeErr } = useDisclosure();
    const { isOpen: succOpen, onOpen: openSucc, onClose: closeSucc } = useDisclosure();

    if (!achievement) return null;

    const handleDelete = async () => {
        try {
            await achievementService.remove(achievement.id);
            openSucc();
        } catch (err) {
            setErrMsg(err?.response?.data?.detail || "Failed to delete achievement.");
            openErr();
        }
    };

    const onSuccClose = () => {
        closeSucc();
        onClose();
        if (onDeleted) onDeleted();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", md: "4xl" }} isCentered>
                <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(2px)" />
                <ModalContent
                    maxH={{ base: "100vh", md: "85vh" }}
                    borderRadius={{ base: 0, md: "2xl" }}
                    overflow="hidden"
                    boxShadow="card-hover"
                >
                    <ModalBody display="flex" flexDirection={{ base: "column", md: "row" }} padding={0}>
                        <Box flex={{ base: "none", md: 1 }} maxH={{ base: "40vh", md: "85vh" }} bg="slate.900">
                            <Image
                                src={achievement.image}
                                alt={achievement.title}
                                objectFit="cover"
                                w="100%"
                                h="100%"
                            />
                        </Box>
                        <Box flex={1} bg="white" maxH={{ base: "60vh", md: "85vh" }} display="flex" flexDirection="column">
                            <HStack
                                justify={isAdmin ? "space-between" : "flex-end"}
                                px={4}
                                py={3}
                                borderBottom="1px solid"
                                borderColor="slate.100"
                                flexShrink={0}
                            >
                                {isAdmin && (
                                    <Flex gap={1}>
                                        <IconButton
                                            variant="ghost"
                                            borderRadius="full"
                                            color="slate.600"
                                            _hover={{ bg: "slate.100" }}
                                            aria-label="Delete"
                                            onClick={openDel}
                                            icon={<DeleteIcon />}
                                        />
                                        <Link href={`/portfolio/achievements/edit-item/${achievement.id}`}>
                                            <IconButton
                                                variant="ghost"
                                                borderRadius="full"
                                                color="slate.600"
                                                _hover={{ bg: "slate.100" }}
                                                aria-label="Edit"
                                                icon={<EditIcon />}
                                            />
                                        </Link>
                                    </Flex>
                                )}
                                <IconButton
                                    variant="ghost"
                                    borderRadius="full"
                                    color="slate.600"
                                    _hover={{ bg: "slate.100" }}
                                    aria-label="Close"
                                    onClick={onClose}
                                    icon={<CloseIcon />}
                                />
                            </HStack>

                            <Box px={7} py={5} overflowY="auto">
                                <ModalHeader p={0} mb={3} fontFamily="display" fontSize="2xl" color="slate.900" lineHeight="short">
                                    {achievement.title}
                                </ModalHeader>

                                <HStack spacing={3} mb={4} flexWrap="wrap">
                                    {achievement.category && (
                                        <Badge colorScheme="slate" borderRadius="full" px={2} textTransform="uppercase">
                                            {achievement.category}
                                        </Badge>
                                    )}
                                    {achievement.batch && (
                                        <Badge colorScheme="primary" borderRadius="full" px={2} textTransform="uppercase">
                                            {achievement.batch}
                                        </Badge>
                                    )}
                                    {achievement.date && (
                                        <HStack spacing={1} color="slate.500" fontSize="sm">
                                            <CalendarIcon boxSize={3} />
                                            <Text>{new Date(achievement.date).toLocaleDateString()}</Text>
                                        </HStack>
                                    )}
                                    {achievement.featured && (
                                        <Badge colorScheme="yellow" variant="solid" borderRadius="full" px={2}>FEATURED</Badge>
                                    )}
                                    {achievement.visible === false && (
                                        <Badge colorScheme="red" borderRadius="full" px={2}>HIDDEN</Badge>
                                    )}
                                </HStack>

                                <Text mb={4} color="slate.600" lineHeight="tall">
                                    {achievement.description || "No description available."}
                                </Text>

                                <ContributorsList contributors={achievement.recipients || []} label="Recipients" />

                                {achievement.searchTags?.length > 0 && (
                                    <Box mt={4}>
                                        <Text fontSize="xs" color="slate.500" mb={2} fontWeight="bold" letterSpacing="wider">TAGS</Text>
                                        <Wrap spacing={2}>
                                            {achievement.searchTags.map((tag) => (
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
                    </ModalBody>
                </ModalContent>
            </Modal>

            <DeleteConfirmModal isOpen={delOpen} onClose={closeDel} onDelete={handleDelete} />
            <ErrorModal isOpen={errOpen} onClose={closeErr} errorMessage={errMsg} />
            <SuccessModal
                isOpen={succOpen}
                onClose={onSuccClose}
                successMessage="Achievement deleted."
            />
        </>
    );
}
