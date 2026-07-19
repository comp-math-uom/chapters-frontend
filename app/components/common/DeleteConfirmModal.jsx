import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

export default function DeleteConfirmModal({isOpen, onClose, onDelete, message = "Are you sure you want to delete this item?"}) {

    const handleDelete = () => {
        onDelete();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(2px)" />
            <ModalContent borderRadius="xl">
                <ModalHeader color="slate.900" fontFamily="display">Delete Confirmation</ModalHeader>
                <ModalBody>
                    <Text color="slate.600">
                        {message}
                    </Text>
                </ModalBody>
                <ModalFooter gap={3}>
                    <Button colorScheme="red" borderRadius="lg" onClick={handleDelete}>Delete</Button>
                    <Button variant="outline" borderColor="slate.300" borderRadius="lg" _hover={{ bg: "slate.100" }} onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}