/** @type {import('next').NextConfig} */
const nextConfig = {
reactStrictMode: true,
    images: {
        remotePatterns: [
            { hostname: "assets.react-photo-album.com" }
        ]
    }
};

export default nextConfig;
