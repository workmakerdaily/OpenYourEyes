"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const NavigationBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-black sticky top-0 z-50 shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6 text-white py-6 flex items-center justify-between">
                
                {/* 🖥️ 데스크탑 메뉴 */}
                <div className="hidden text-sm lg:flex space-x-6">
                    <Link href="/performance" className="hover:text-gray-400">공연</Link>
                    <Link href="/venue" className="hover:text-gray-400">공연장</Link>
                    <Link href="/producer" className="hover:text-gray-400">기획/제작사</Link>
                    <Link href="/boxoffice" className="hover:text-gray-400">예매 순위</Link>
                </div>

                {/* 🏠 메인 타이틀 */}
                <Link 
                    href="/" 
                    className="text-xl font-bold uppercase tracking-wide lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
                >
                    Open Your Eyes
                </Link>

                {/* 🔎 검색 & 로그인 */}
                <div className="text-sm flex items-center space-x-4">

                    {/* 로그인 & 회원가입 */}
                    <div className="hidden lg:flex space-x-3">
                        <Link href="/login" className="hover:text-gray-300">로그인</Link>
                        <Link href="/signup" className="hover:text-gray-300">회원가입</Link>
                    </div>

                    {/* 🍔 모바일 메뉴 버튼 */}
                    <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* 📱 모바일 메뉴 */}
            {menuOpen && (
                <div className="lg:hidden bg-black text-white flex flex-col items-start space-y-4 py-6 px-6">
                    <Link href="/performances" className="hover:text-gray-400">공연</Link>
                    <Link href="/venue" className="hover:text-gray-400">공연장</Link>
                    <Link href="/producer" className="hover:text-gray-400">기획/제작사</Link>
                    <Link href="/boxoffice" className="hover:text-gray-400">예매 순위</Link>

                    {/* 로그인 & 회원가입 */}
                    <div className="w-full border-t border-gray-600 mt-4"></div>
                    <div className="pt-4 mt-2 flex flex-col items-start space-y-2">
                        <Link href="/login" className="hover:text-gray-400">로그인</Link>
                        <Link href="/signup" className="hover:text-gray-400">회원가입</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationBar;
