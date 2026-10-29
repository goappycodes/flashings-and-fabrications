import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Placeholder photography until the FFS shoot; remove once real images are in place.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
  async redirects() {
    // Static homepage concepts live in public/home-N/, which is only served at exact file paths.
    // The old concept URLs (/dark, /bold, /final, /final-v2) were shared before the rename.
    return [
      { source: "/home-1", destination: "/", permanent: false },
      ...[2, 3, 4, 5, 6].map((n) => ({
        source: `/home-${n}`,
        destination: `/home-${n}/index.html`,
        permanent: false,
      })),
      { source: "/final-v2/:path*", destination: "/home-2/:path*", permanent: false },
      { source: "/final/:path*", destination: "/home-3/:path*", permanent: false },
      { source: "/bold", destination: "/home-4/index.html", permanent: false },
      { source: "/dark", destination: "/home-5/index.html", permanent: false },
    ];
  },
};

export default nextConfig;
