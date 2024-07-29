/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["rukminim2.flixcart.com", "assets.myntassets.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
