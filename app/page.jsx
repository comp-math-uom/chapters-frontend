"use client";

import React from "react";
import Navbar from "./components/common/Navbar";
import HeroSection from "./components/landing/HeroSection";
import ContactUs from "@/app/components/landing/ContactUs";
import WeAre from "@/app/components/landing/WeAre";
import Blog from "@/app/components/landing/Blog";
import AchievementsSection from "@/app/components/landing/AchievementsSection";
import Forum from "@/app/components/landing/Forum";
import Portfolio from "@/app/components/landing/Portfolio";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="container-fluid flex flex-col justify-center items-center m-auto">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                style={{ scaleX }}
            />
            <Navbar/>
            <main className="flex flex-col w-full container px-4 sm:px-8 md:px-12 lg:px-20 mt-16 md:mt-20">
                <HeroSection />
                <AchievementsSection/>
                <Portfolio />
                <Forum />
                <Blog />
                <WeAre />
                <ContactUs />
            </main>
        </div>
    );
}