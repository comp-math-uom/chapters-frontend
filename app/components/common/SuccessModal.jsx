'use client';

import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function SuccessModal({isOpen, onClose, successMessage}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(2px)"/>
            <ModalContent borderRadius="xl">
                <ModalHeader>
                    <Flex align="center" gap={2}>
                        <CheckCircleIcon color="green.500"/>
                        <Text color="slate.900" fontFamily="display">Success</Text>
                    </Flex>
                </ModalHeader>
                <ModalBody color="slate.600">
                    {successMessage || "Operation completed successfully."}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="green" borderRadius="lg" onClick={onClose}>
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}