/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {hostname: "assets.react-photo-album.com"},
            {hostname: "picsum.photos"},
            {hostname: "i.ibb.co"},
            {hostname: "images.unsplash.com"}
        ]
    },
    output: "standalone"
};

export default nextConfig;
