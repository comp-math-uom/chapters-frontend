'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

export default function SuccessModal({isOpen, onClose, successMessage}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Success</ModalHeader>
                <ModalBody>
                    {successMessage || "Action completed successfully."}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="green" onClick={onClose}>
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}