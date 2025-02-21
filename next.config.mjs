/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/daukkeshg/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
