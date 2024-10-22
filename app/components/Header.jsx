"use client";

import { useState } from 'react';
import Image from "next/image";
import LineFilter from '../assets/img/line-filter.svg';
import Filtered from '../assets/img/fill-filter.svg';
import ArrowDown from '../assets/img/arrow-down.svg';
import { toggleFilterText } from '../services/filterService.js';
import {
    Box,
    Flex,
    Heading,
    Text,
    Input,
    Button,
    VStack,
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

export default function Header() {
    const [filterIcon, setFilterIcon] = useState(LineFilter);
    const [showText, setShowText] = useState(false);

    const handleToggleFilter = () => {
        toggleFilterText();

        if (filterIcon === LineFilter) {
            setFilterIcon(Filtered);
            setShowText(true);
        } else {
            setFilterIcon(LineFilter);
            setShowText(false);
        }
    };

    return (
        <Box width="full" py={16}>
            <VStack spacing={8} align="center">
                <Box maxW="2xl" textAlign="center">
                    <Heading as="h1" size="4xl" fontWeight="bold" className={'font-anton'}>
                        PORTFOLIO
                    </Heading>
                    <Text mt={4} fontSize="lg" color="gray.500" className={'font-anybody'}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever.
                    </Text>
                </Box>

                <Flex w="full" maxW="7xl" justify="center" align="center">
                    <InputGroup size="lg">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            placeholder=""
                            borderWidth={2}
                            borderColor="gray.300"
                            borderRadius="xl"
                            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                        />
                    </InputGroup>
                    <Box ml={4} width="40px" height="40px" position="relative">
                        <Button
                            onClick={handleToggleFilter}
                            background="transparent"
                            _hover={{ background: "transparent" }}
                            width="100%"
                            height="100%"
                            p={0}
                        >
                            <Box position="absolute" top={0} left={0} width="100%" height="100%">
                                <Image
                                    src={filterIcon}
                                    alt="Filter Icon"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </Box>
                        </Button>
                    </Box>
                </Flex>

                {showText && (
                    <HStack spacing={4} w="full" maxW="93%" justify="space-between">
                        <Menu>
                            <MenuButton variant='outline' borderWidth='2px' as={Button} leftIcon={<ChevronDownIcon />} w="20%">
                                Year
                            </MenuButton>
                            <MenuList>
                                <MenuItem>2022</MenuItem>
                                <MenuItem>2023</MenuItem>
                                <MenuItem>2024</MenuItem>
                                <MenuItem>2025</MenuItem>
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton variant='outline' borderWidth='2px' as={Button} leftIcon={<ChevronDownIcon />} w="20%">
                                Batch
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Batch 21</MenuItem>
                                <MenuItem>Batch 22</MenuItem>
                                <MenuItem>Batch 23</MenuItem>
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton variant='outline' borderWidth='2px' as={Button} leftIcon={<ChevronDownIcon />} w="20%">
                                Month
                            </MenuButton>
                            <MenuList>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                    <MenuItem key={month}>{month}</MenuItem>
                                ))}
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton variant='outline' borderWidth='2px' as={Button} leftIcon={<ChevronDownIcon />} w="20%">
                                Field
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Hardware</MenuItem>
                                <MenuItem>Software</MenuItem>
                            </MenuList>
                        </Menu>

                        <Button colorScheme="gray" w="17%">
                            Filter
                        </Button>
                    </HStack>
                )}
            </VStack>
        </Box>
    );
}