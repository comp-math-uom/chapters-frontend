"use client";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-700 border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-black">CHAPTERS</h3>
                        <p className="text-gray-600 text-sm">
                            Capturing adventures and sharing stories from the great outdoors.
                        </p>

                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-black">Stay Updated</h4>
                        <p className="text-gray-600 text-sm">Subscribe to our newsletter for the latest updates and stories.</p>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border border-gray-300 px-4 py-2 rounded-lg flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <button className="bg-black hover:bg-gray-800 px-4 py-2 rounded-lg text-white text-sm transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} CHAPTERS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}