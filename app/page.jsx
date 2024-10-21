import React from "react";
import Header from './components/Header';
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div className="container-fluid flex flex-col justify-center m-auto">
            <Navbar />
        </div>
    );
}