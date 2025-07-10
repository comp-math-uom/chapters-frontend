/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {hostname: "assets.react-photo-album.com"},
            {hostname: "picsum.photos"},
            {hostname: "i.ibb.co"}
        ]
    },
    output: "standalone"
};

export default nextConfig;
