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
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Flex align="center" gap={2}>
                        <WarningIcon color="red.500"/>
                        <Text>Error</Text>
                    </Flex>
                </ModalHeader>
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