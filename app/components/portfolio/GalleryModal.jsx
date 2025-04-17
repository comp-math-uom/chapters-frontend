"use client";

import React, { useEffect, useRef, useState } from "react";
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

export default function GalleryModal({isOpen, onClose, galleryItem, isAdmin = false}) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [imageHeight, setImageHeight] = useState(null);
    const imageRef = useRef(null);
    const {isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete} = useDisclosure();
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleAddComment = () => {
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    const onClickDelete = (itemId) => {
        setItemToDelete(itemId)
        onOpenDelete();
    }

    const handleDelete = () => {
        onClose();
    }

    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current.clientHeight);
        }
    }, [galleryItem]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="5xl" closeOnOverlayClick={true} isCentered>
                <ModalOverlay/>
                <ModalContent style={{maxWidth: "100vw", width: "70vw", maxHeight: "80vh"}}>
                    <ModalBody display="flex" padding={0} maxHeight="80vh">
                        <Box flex={1} maxHeight="80vh" position="relative">
                            <Image
                                ref={imageRef}
                                src={galleryItem.src}
                                alt={galleryItem.topic}
                                roundedTopStart={"md"}
                                objectFit="cover"
                                w="100%"
                                h="100%"
                                onLoad={() => setImageHeight(imageRef.current.clientHeight)}
                            />
                        </Box>
                        <Box flex={1} px={2} height="80vh">
                            <HStack className={isAdmin ? "flex justify-between mt-2" : "flex justify-end mt-2"}
                                    paddingLeft={4}>
                                {isAdmin &&
                                    <Flex gap={2}>
                                        <IconButton variant='ghost' colorScheme='gray' aria-label='Delete'
                                                    onClick={onClickDelete}
                                                    icon={<DeleteIcon/>}/>
                                        <Link href={`/portfolio/edit-item/${4}`}>
                                            <IconButton variant='ghost' colorScheme='gray' aria-label='Edit'
                                                        icon={<EditIcon/>}/>
                                        </Link>
                                    </Flex>
                                }
                                <IconButton variant='ghost' colorScheme='gray' aria-label='Close' onClick={onClose}
                                            icon={<CloseIcon/>}/>
                            </HStack>
                            <Box flex={1} px={7} overflowY="auto" maxHeight="calc(80vh - 60px)" overflowX="clip">
                                <ModalHeader pl={0}>{galleryItem.topic}</ModalHeader>
                                <Text mb={4} textAlign="justify">
                                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                                    praesentium
                                    voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                                    occaecati
                                    cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia
                                    animi,
                                    id
                                    est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                                    distinctio.
                                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                                    minus
                                    id
                                    quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
                                    repellendus.
                                    Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                                    eveniet
                                    ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum
                                    hic
                                    tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
                                    consequatur
                                    aut
                                    perferendis doloribus asperiores repellat.
                                </Text>

                                <ContributorsList contributors={contributors}/>

                                <Flex gap={3} className="my-10" alignItems="center">
                                    <Avatar name="John Doe"></Avatar>
                                    <InputGroup size='md' borderRadius="lg">
                                        <Input
                                            _focus={{
                                                bg: "#e2e8f0",
                                                borderColor: "transparent"
                                            }}
                                            borderRadius="full" variant='filled' placeholder='Leave a comment'/>
                                        <InputRightElement>
                                            <IconButton borderRadius="full" bg="black" color="white" size='xs'
                                                        icon={<ChevronRightIcon/>} onClick={handleAddComment}
                                                        aria-label="send"/>
                                        </InputRightElement>
                                    </InputGroup>
                                </Flex>

                                <FeedbackSection as="h6" size="xs"/>

                                <VStack align="start" mt={6}>
                                    {comments.map((cmt, idx) => (
                                        <Box key={idx} bg="gray.100" p={4} borderRadius="md" w="full">
                                            {cmt}
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <DeleteConfirmModal isOpen={isOpenDelete} onClose={onCloseDelete} onDelete={handleDelete}/>
        </>
    );
};