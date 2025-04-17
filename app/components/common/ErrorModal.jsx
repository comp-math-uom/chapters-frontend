'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

export default function ErrorModal({isOpen, onClose, errorMessage}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Error</ModalHeader>
                <ModalBody>
                    {errorMessage || "Failed to save data."}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={onClose}>
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}