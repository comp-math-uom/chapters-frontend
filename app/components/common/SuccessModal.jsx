'use client';

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function SuccessModal({ isOpen, onClose, successMessage }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex align="center" gap={2}>
                        <CheckCircleIcon color="green.500" />
                        <Text>Success</Text>
                    </Flex>
                </ModalHeader>
                <ModalBody>
                    {successMessage || "Operation completed successfully."}
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