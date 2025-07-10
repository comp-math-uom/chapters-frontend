import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

export default function DeleteConfirmModal({isOpen, onClose, onDelete, message = "Are you sure you want to delete this item?"}) {

    const handleDelete = () => {
        onDelete();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
            <ModalContent>
                <ModalHeader>Delete Confirmation</ModalHeader>
                <ModalBody>
                    <Text>
                        {message}
                    </Text>
                </ModalBody>
                <ModalFooter gap={3}>
                    <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}