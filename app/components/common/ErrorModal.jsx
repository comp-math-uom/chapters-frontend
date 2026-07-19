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
import { WarningIcon } from '@chakra-ui/icons';

export default function ErrorModal({isOpen, onClose, errorMessage}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(2px)"/>
            <ModalContent borderRadius="xl">
                <ModalHeader>
                    <Flex align="center" gap={2}>
                        <WarningIcon color="red.500"/>
                        <Text color="slate.900" fontFamily="display">Error</Text>
                    </Flex>
                </ModalHeader>
                <ModalBody color="slate.600">
                    {errorMessage || "Failed to save data."}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" borderRadius="lg" onClick={onClose}>
                        OK
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}