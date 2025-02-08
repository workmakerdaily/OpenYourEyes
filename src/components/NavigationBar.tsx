"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const NavigationBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdown, setDropdown] = useState("");

    return (
        <nav className="w-full bg-black sticky top-0 z-50 shadow-md">
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6 text-white py-6 flex items-center justify-between">
                
                {/* 데스크탑: 왼쪽 메뉴 | 모바일: 숨김 */}
                <div className="hidden text-sm lg:flex space-x-6">
                    {/* 공연 목록 */}
                    <div className="relative group">
                        <button className="hover:text-gray-400 flex items-center">
                            공연 목록 <FiChevronDown className="ml-1" />
                        </button>
                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-black border border-gray-700 p-2 rounded-md w-48">
                            <Link href="/performances" className="block px-4 py-2 hover:bg-gray-800">전체 공연</Link>
                            <Link href="/performances?category=shcate" className="block px-4 py-2 hover:bg-gray-800">장르별</Link>
                            <Link href="/performances?state=prfstate" className="block px-4 py-2 hover:bg-gray-800">공연 상태별</Link>
                            <Link href="/performances?location=signgucode" className="block px-4 py-2 hover:bg-gray-800">지역별</Link>
                        </div>
                    </div>

                    {/* 공연장 */}
                    <div className="relative group">
                        <button className="hover:text-gray-400 flex items-center">
                            공연장 <FiChevronDown className="ml-1" />
                        </button>
                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-black border border-gray-700 p-2 rounded-md w-48">
                            <Link href="/venues" className="block px-4 py-2 hover:bg-gray-800">전체 공연장</Link>
                            <Link href="/venues?type=fcltychartr" className="block px-4 py-2 hover:bg-gray-800">공연장 특징</Link>
                            <Link href="/venues?location=signgucode" className="block px-4 py-2 hover:bg-gray-800">지역별</Link>
                        </div>
                    </div>

                    {/* 기획/제작사 */}
                    <Link href="/productions" className="hover:text-gray-400">기획/제작사</Link>

                    {/* 예매 순위 */}
                    <Link href="/boxoffice" className="hover:text-gray-400">예매 순위</Link>
                </div>

                {/* 데스크탑: 가운데 타이틀 */}
                <Link 
                    href="/" 
                    className="text-xl font-bold uppercase tracking-wide lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
                >
                    Open Your Eyes
                </Link>

                {/* 검색창 & 로그인/회원가입 (항상 오른쪽에 표시) */}
                <div className="text-sm flex items-center space-x-4">
                    {/* 검색창 (모바일에서는 숨김, md 이상에서 표시) */}
                    <input 
                        type="text" 
                        placeholder="검색" 
                        className="hidden md:block px-3 py-2 bg-[#292929] text-white rounded-md focus:outline-none"
                    />

                    {/* 로그인 & 회원가입 (항상 표시) */}
                    <div className="hidden lg:flex space-x-3">
                        <Link href="/login" className="hover:text-gray-300">로그인</Link>
                        <Link href="/signup" className="hover:text-gray-300">회원가입</Link>
                    </div>

                    {/* 모바일: 오른쪽 햄버거 메뉴 */}
                    <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* 모바일 메뉴 (햄버거 메뉴 클릭 시 열림) */}
            {menuOpen && (
                <div className="lg:hidden bg-black text-white flex flex-col items-start space-y-4 py-6 px-6">
                    {/* 공연 목록 (모바일 드롭다운) */}
                    <button 
                        onClick={() => setDropdown(dropdown === "performances" ? "" : "performances")} 
                        className="hover:text-gray-400 flex items-center w-full"
                    >
                        공연 목록 <FiChevronDown className="ml-1" />
                    </button>
                    {dropdown === "performances" && (
                        <div className="flex flex-col space-y-2 pl-4">
                            <Link href="/performances" className="hover:text-gray-400">전체 공연</Link>
                            <Link href="/performances?category=shcate" className="hover:text-gray-400">장르별</Link>
                            <Link href="/performances?state=prfstate" className="hover:text-gray-400">공연 상태별</Link>
                            <Link href="/performances?location=signgucode" className="hover:text-gray-400">지역별</Link>
                        </div>
                    )}

                    {/* 공연장 */}
                    <button 
                        onClick={() => setDropdown(dropdown === "venues" ? "" : "venues")} 
                        className="hover:text-gray-400 flex items-center w-full"
                    >
                        공연장 <FiChevronDown className="ml-1" />
                    </button>
                    {dropdown === "venues" && (
                        <div className="flex flex-col space-y-2 pl-4">
                            <Link href="/venues" className="hover:text-gray-400">전체 공연장</Link>
                            <Link href="/venues?type=fcltychartr" className="hover:text-gray-400">공연장 특징</Link>
                            <Link href="/venues?location=signgucode" className="hover:text-gray-400">지역별</Link>
                        </div>
                    )}

                    {/* 기타 메뉴 */}
                    <Link href="/productions" className="hover:text-gray-400">기획/제작사</Link>
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
