import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: false },
  async redirects() {
    return [
      { source: "/recycle", destination: "/az/recycle", permanent: true },
      { source: "/business", destination: "/az/business", permanent: true },
      { source: "/what-we-accept", destination: "/az/what-we-accept", permanent: true },
      { source: "/services", destination: "/az/services", permanent: true },
      { source: "/services/:path*", destination: "/az/services/:path*", permanent: true },
      { source: "/areas", destination: "/az", permanent: true },
      { source: "/areas/:city", destination: "/az/:city", permanent: true },
      { source: "/faq", destination: "/az/faq", permanent: true },
      { source: "/contact", destination: "/az/contact", permanent: true },
      { source: "/privacy", destination: "/az/privacy", permanent: true },
      { source: "/terms", destination: "/az/terms", permanent: true },
      { source: "/acceptance-policy", destination: "/az/acceptance-policy", permanent: true },
      { source: "/accessibility", destination: "/az/accessibility", permanent: true },
    ];
  },
};
export default nextConfig;
