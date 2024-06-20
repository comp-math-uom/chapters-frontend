import React from "react";
import Header from './components/header';
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div className="container flex flex-col justify-center px-20 m-auto">
            <Navbar />
            <Header />
            
        </div>
    );
}