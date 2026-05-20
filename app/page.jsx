"use client";

import React from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HeroSection from "./components/landing/HeroSection";
import ContactUs from "@/app/components/landing/ContactUs";
import WeAre from "@/app/components/landing/WeAre";
import Blog from "@/app/components/landing/Blog";
import AchievementsSection from "@/app/components/landing/AchievementsSection";
import Portfolio from "@/app/components/landing/Portfolio";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div className="flex flex-col min-h-screen">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                style={{ scaleX }}
            />
            <Navbar />
            <main className="flex flex-col w-full container px-4 sm:px-8 md:px-12 lg:px-20 mt-16 md:mt-20 mx-auto flex-grow">
                <HeroSection />
                <AchievementsSection />
                <Portfolio />
                <Blog />
                <WeAre />
                <ContactUs />
            </main>
            <Footer />
        </div>
    );
}
