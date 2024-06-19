import styles from '../page.module.css';
import Image from "next/image";
import filterIcon from '../data/noun-filter-6630842.svg';

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center py-16">
            <div className={"max-w-screen-lg w-full flex flex-col items-center justify-center"}>
                <h1 className="text-6xl font-bold text-gray-800">PORTFOLIO</h1>
                <p className="mt-4 text-lg text-gray-500 text-center">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever.
                </p>
            </div>
            <div className={"w-full max-w-screen-lg mt-8 flex items-center justify-between"}>
                <div className="relative w-4/5">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full py-3 pl-10 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-3 top-3 text-gray-400">
                        <svg className="feather feather-search" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                        </svg>
                    </div>
                </div>
                <div className="relative h-10 flex items-center">
                    <button className="h-full w-auto">
                        <Image src={filterIcon} alt="Filter Icon" height={48} width={48} className="h-full w-auto"/>
                    </button>
                </div>
            </div>
        </header>
    );
}
