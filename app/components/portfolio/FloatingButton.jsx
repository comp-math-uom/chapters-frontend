"use client";

import Link from 'next/link';

export default function FloatingButton({url = "/"}) {
    return (
        <Link href={url}>
            <div
                className="fixed flex items-center justify-center w-16 h-16 text-white bg-black rounded-full cursor-pointer bottom-5 right-5 hover:bg-gray-800">
                <span className="text-3xl">+</span>
            </div>
        </Link>
    );
}
