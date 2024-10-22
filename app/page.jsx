import React from "react";
import PortfolioHeader from './components/PortfolioHeader';
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div className="container-fluid flex flex-col justify-center m-auto">
            <Navbar />
        </div>
    );
}