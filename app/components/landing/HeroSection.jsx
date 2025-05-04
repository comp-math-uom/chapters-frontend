import React from "react";
import Link from "next/link";
import Image from "next/image";

function HeroSection() {
    return (
        <section className="py-16 px-4 border-b border-gray-200">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2 lg:pr-16">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="block">AI STUDENTS</span>
                        <span className="block text-blue-500">CHAPTER</span>
                    </h1>
                    <p className="mb-6 text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. We are a student chapter at the University of Edinburgh. We focus on AI, robotics and computer science events with a focus on providing opportunities to students. Join our community if you are interested in the world of technology and science.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/auth/signup">
                            <button className="px-6 py-2 border border-black rounded-full transition hover:bg-gray-100">
                                REGISTER
                            </button>
                        </Link>
                        <Link href="/auth/login">
                            <button className="px-6 py-2 bg-black text-white rounded-full transition hover:bg-gray-800">
                                SIGN IN
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    <div className="relative w-full h-64 lg:h-80">
                        <Image
                            src={'/img/hero-section.png'}
                            alt="AI Students Illustration"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-10">
                <div className="rounded-lg p-6 py-10 border-black border-[1px]">
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit lacinia imperdiet torquor consequat sit
                        habitasse vestibulum mauris libero. Sit eget faucibus magna rhoncus ultricies elit libero. Sed nec felis ipsum torquor non sed libero. Sed nec felis ipsum amet sit non felis ipsum torquor.
                    </p>
                    <div className="flex justify-around">
                        <div className="flex flex-col items-center">
                            <Image src={"/img/dl.png"} alt="Deep Learning" width={40} height={40} />
                            <span className="mt-2 text-sm">Deep Learning</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image src={"/img/int.png"} alt="Intelligence" width={40} height={40} />
                            <span className="mt-2 text-sm">Intelligence</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image src={"/img/cs.png"} alt="Computer Science" width={40} height={40} />
                            <span className="mt-2 text-sm">Computer Science</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;