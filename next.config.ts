import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ 타입 에러 무시하고 빌드 진행
  },
  /* config options here */
  images: {
    domains: ["www.kopis.or.kr"],
  },
};

export default nextConfig;
