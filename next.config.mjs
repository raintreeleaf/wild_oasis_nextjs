/** @type {import('next').NextConfig} */
//If we want to optimise images with Image component and the images are hosted remotely
//we have to use this config.
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ztobqhaewifcjgmhjldc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;
