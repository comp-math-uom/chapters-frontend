import React from "react";
import Navbar from "./components/common/Navbar";
import HeroSection from "./components/landing/HeroSection";
import ContactUs from "@/app/components/landing/ContactUs";
import WeAre from "@/app/components/landing/WeAre";
import Blog from "@/app/components/landing/Blog";
// import AchievementsSection from "./components/landing/AchievementsSection";

export default function Home() {
    return (
        <div className="container-fluid flex flex-col justify-center items-center m-auto">
            <Navbar/>
            <main className="flex flex-col w-full container px-20 mt-20">
                <HeroSection />
                <Blog />
                <WeAre />
                <ContactUs />
                {/* You can add more sections here as you develop them */}
            </main>
        </div>
    );
}