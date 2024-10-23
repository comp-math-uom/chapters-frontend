// app/components/portfolio/GalleryModal.jsx
import React, {useEffect, useRef, useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Image,
    Text,
    Button,
    Textarea,
    VStack,
} from "@chakra-ui/react";

const GalleryModal = ({ isOpen, onClose, selectedPhoto }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [imageHeight, setImageHeight] = useState(null); // Track image height
    const imageRef = useRef(null); // Reference to the image element

    const handleAddComment = () => {
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    // Set the modal height based on image height when the image loads
    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current.clientHeight);
        }
    }, [selectedPhoto]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody display="flex" paddingLeft={0} paddingTop={0}>
                    {/* Left: Image */}
                    <Box flex={1}>
                        <Image
                            ref={imageRef}
                            src={selectedPhoto.src}
                            alt={selectedPhoto.topic}
                            roundedTopStart={"md"}
                            onLoad={() => setImageHeight(imageRef.current.clientHeight)}
                        />
                    </Box>
                    {/* Right: Scrollable Text & Comment Section */}
                    <Box flex="1" ml={6} maxH="500px" overflow="scroll" marginTop={14}>
                        <ModalHeader>{selectedPhoto.topic}</ModalHeader>
                        <Text mb={4}>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
                            est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id
                            quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
                            ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
                            tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
                            perferendis doloribus asperiores repellat.
                        </Text>

                        {/* Comment Input */}
                        <Textarea
                            placeholder="Leave a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            mb={4}
                        />
                        <Button onClick={handleAddComment} colorScheme="blue">
                            Add Comment
                        </Button>

                        {/* Comments Section */}
                        <VStack align="start" mt={6}>
                            {comments.map((cmt, idx) => (
                                <Box key={idx} bg="gray.100" p={4} borderRadius="md" w="full">
                                    {cmt}
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                </ModalBody>
                <ModalFooter/>
            </ModalContent>
        </Modal>
    );
};

export default GalleryModal;
