import React from "react";
import Header from './components/header';
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div className="container-fluid flex flex-col justify-center m-auto">
            <Navbar />
            
            <div className="container flex flex-col justify-center m-auto">
                <Header />                
            </div>
        </div>
    );
}