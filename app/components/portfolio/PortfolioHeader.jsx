"use client";

import {useState} from 'react';
import Image from "next/image";
import LineFilter from '../../assets/img/line-filter.svg';
import Filtered from '../../assets/img/fill-filter.svg';
import {toggleFilterText} from '../../services/filterService.js';
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export default function PortfolioHeader({filterFn, resetFn}) {
    const [filterIcon, setFilterIcon] = useState(LineFilter);
    const [showText, setShowText] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedBatch, setSelectedBatch] = useState('');
    const [selectedField, setSelectedField] = useState('');

    const monthLIst = [
        {name: "January", number: 1},
        {name: "February", number: 2},
        {name: "March", number: 3},
        {name: "April", number: 4},
        {name: "May", number: 5},
        {name: "June", number: 6},
        {name: "July", number: 7},
        {name: "August", number: 8},
        {name: "September", number: 9},
        {name: "October", number: 10},
        {name: "November", number: 11},
        {name: "December", number: 12}
    ];

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

    const handleFilterClick = (isAdvanced = true) => {
        const filterData = {
            searchText,
            year: selectedYear,
            month: selectedMonth,
            batch: selectedBatch,
            field: selectedField,
            advanced: isAdvanced
        };
        filterFn(filterData);
    };

    const handleEnterPress = (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            handleFilterClick(false);
        } else {
            setSearchText(e.target.value);
        }
    }

    const handleReset = () => {
        setSearchText('');
        setSelectedYear('');
        setSelectedMonth('');
        setSelectedBatch('');
        setSelectedField('');
        resetFn();
    }

    return (
        <Box width="full" py={16} pt={36}>
            <VStack spacing={10} align="center">
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
                            <SearchIcon color="gray.300"/>
                        </InputLeftElement>
                        <Input
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleEnterPress}
                            placeholder=""
                            borderWidth={2}
                            borderColor="gray.300"
                            borderRadius="xl"
                            _focus={{borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce"}}
                        />
                        <InputRightElement>
                            <Button variant="ghost" colorScheme='gray'
                                    _focusVisible={{outline: 'none'}}
                                    onClick={() => setSearchText("")} size="sm">X</Button>
                        </InputRightElement>
                    </InputGroup>
                    <Box ml={4} width="40px" height="40px" position="relative">
                        <Tooltip hasArrow label="Advanced filter" borderRadius="md">
                            <Button
                                onClick={handleToggleFilter}
                                background="transparent"
                                _hover={{background: "transparent"}}
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
                            </Button></Tooltip>
                    </Box>
                </Flex>

                {showText && (
                    <HStack spacing={4} w="full" maxW="93%" justify="space-between">
                        <Select
                            placeholder="Select Year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            w="16%"
                            borderWidth="2px"
                        >
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </Select>

                        <Select
                            placeholder="Select Month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            w="16%"
                            borderWidth="2px"
                        >
                            {monthLIst.map((month) => (
                                <option key={month.number} value={month.number}>{month.name}</option>
                            ))}
                        </Select>

                        <Select
                            placeholder="Select Batch"
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                            w="16%"
                            borderWidth="2px"
                        >
                            <option value="Batch 21">Batch 21</option>
                            <option value="Batch 22">Batch 22</option>
                            <option value="Batch 23">Batch 23</option>
                        </Select>

                        <Select
                            placeholder="Select Field"
                            value={selectedField}
                            onChange={(e) => setSelectedField(e.target.value)}
                            w="16%"
                            borderWidth="2px"
                        >
                            <option value="Hardware">Hardware</option>
                            <option value="Software">Software</option>
                        </Select>

                        <Button w="16%" onClick={handleReset}>
                            Clear
                        </Button>

                        <Button bg="black" color="white" _hover={{bg: "gray.800"}} w="16%" onClick={() => handleFilterClick(true)}>
                            Filter
                        </Button>
                    </HStack>
                )}
            </VStack>
        </Box>
    );
}
