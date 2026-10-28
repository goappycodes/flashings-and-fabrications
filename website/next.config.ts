import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Placeholder photography until the FFS shoot; remove once real images are in place.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
