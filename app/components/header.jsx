"use client";

import { useState } from 'react';
import Image from "next/image";
import LineFilter from '../data/line-filter.svg';
import Filtered from '../data/fill-filter.svg';
import ArrowDown from '../data/arrow-down.svg';
import { toggleFilterText } from '../services/filterService.js';


export default function Header() {
    const [filterIcon, setFilterIcon] = useState(LineFilter); 
    const [showText, setShowText] = useState(false);
    const [YearOpen, setYearOpen] = useState(false);
    const [BatchOpen, setBatchOpen] = useState(false);
    const [MonthOpen, setMonthOpen] = useState(false);
    const [FieldOpen, setFeildOpen] = useState(false);
      
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
        <header className="w-full flex flex-col items-center justify-center py-16">
            <div className={"max-w-screen-lg w-full flex flex-col items-center justify-center"}>
                <h1 className="text-6xl font-bold text-gray-800">PORTFOLIO</h1>
                <p className="mt-4 text-lg text-gray-500 text-center">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever.
                </p>
            </div>
            <div className="w-full mt-8 flex justify-between">
                <div className="relative w-11/12">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full py-3 pl-10 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-3 top-3 text-gray-400">
                        <svg className="feather feather-search" fill="none" height="24" stroke="#9E9E9E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                        </svg>
                    </div>
                </div>
                <div className="relative w-1/12 h-10 flex items-center justify-center">
                    <button className="h-full w-auto" onClick={ handleToggleFilter }>
                        <Image src={filterIcon} alt="Filter Icon" className="h-full w-auto"/>
                    </button>
                </div>
            </div>
            {showText && (
                <div className="w-full mt-10 flex items-center justify-center text-lg text-gray-500">
                    <ul className="flex flex-wrap gap-4 list-none">
                        <li className="relative flex items-center border border-gray-500 rounded px-4">
                            <div onClick={() => setYearOpen(!YearOpen)} className="cursor-pointer flex items-center">
                                <Image src={ArrowDown} alt="Arrow Down" className="mr-2" />
                                Year
                            </div>
                            {YearOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                    <ul aria-orientation="vertical" className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-100">2022</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">2023</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">2024</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">2025</li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="relative flex items-center border border-gray-500 rounded px-4">
                            <div onClick={() => setBatchOpen(!BatchOpen)} className="cursor-pointer flex items-center">
                                <Image src={ArrowDown} alt="Arrow Down" className="mr-2" />
                                Batch
                            </div>
                            {BatchOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                    <ul aria-orientation="vertical" className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-100">Batch 21</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">Batch 22</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">Batch 23</li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="relative flex items-center border border-gray-500 rounded px-4">
                            <div onClick={() => setMonthOpen(!MonthOpen)} className="cursor-pointer flex items-center">
                                <Image src={ArrowDown} alt="Arrow Down" className="mr-2" />
                                Month
                            </div>
                            {MonthOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                    <ul aria-orientation="vertical" className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-100">January</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">February</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">March</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">April</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">May</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">June</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">July</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">August</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">September</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">October</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">November</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">December</li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="relative flex items-center border border-gray-500 rounded px-4">
                            <div onClick={() => setFeildOpen(!FieldOpen)} className="cursor-pointer flex items-center">
                                <Image src={ArrowDown} alt="Arrow Down" className="mr-2" />
                                Feild
                            </div>
                            {FieldOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                    <ul aria-orientation="vertical" className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-100">Hardware</li>
                                        <li className="px-4 py-2 hover:bg-gray-100">Software</li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="flex items-center">
                            <button className="border border-gray-500 rounded px-4 py-2 bg-gray-200">
                                Filter         
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}