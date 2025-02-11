"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="relative bg-black text-white py-16 px-6">
            {/* 🎭 배경 이미지 추가 */}
            <div className="absolute inset-0 bg-[url('/theater-bg.jpg')] bg-cover bg-center opacity-10"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left relative z-10">
                
                {/* 🔹 브랜드 로고 & 소개 */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold tracking-wider uppercase text-[#C0A36E]">
                        Open Your Eyes
                    </h2>
                    <p className="text-xs opacity-60 mt-2 max-w-xs">
                        공연 예술의 새로운 경험을 제공합니다.<br/>
                        최고의 공연 정보를 한눈에 확인하세요.
                    </p>
                </div>

                {/* 🌍 네비게이션 */}
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-sm">
                    <Link href="/performance" className="hover:text-[#C0A36E] flex items-center space-x-2">
                        <span>공연</span>
                    </Link>
                    <Link href="/venue" className="hover:text-[#C0A36E] flex items-center space-x-2">
                        <span>공연장</span>
                    </Link>
                    <Link href="/producer" className="hover:text-[#C0A36E] flex items-center space-x-2">
                        <span>기획/제작사</span>
                    </Link>
                </div>

                {/* 📌 소셜 미디어 */}
                <div className="flex space-x-4 mt-6 md:mt-0">
                    <Link href="https://instagram.com" target="_blank">
                        <FaInstagram className="w-6 h-6 hover:text-[#C0A36E]" />
                    </Link>
                    <Link href="https://twitter.com" target="_blank">
                        <FaTwitter className="w-6 h-6 hover:text-[#C0A36E]" />
                    </Link>
                    <Link href="https://youtube.com" target="_blank">
                        <FaYoutube className="w-6 h-6 hover:text-[#C0A36E]" />
                    </Link>
                </div>
            </div>


            {/* ⚡ 저작권 & 정보 */}
            <div className="text-center text-xs opacity-60 mt-10 relative z-10">
                <p>© 2025 Open Your Eyes. All rights reserved.</p>
                <p className="mt-2">
                    공연 데이터 제공: (재)예술경영지원센터 공연예술통합전산망 
                    <Link href="https://www.kopis.or.kr" target="_blank" className="underline ml-1">
                        www.kopis.or.kr
                    </Link>
                </p>
            </div>
        </footer>
    );
}
