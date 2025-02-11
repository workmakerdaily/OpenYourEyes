"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useModalStore } from "@/store/modalStore";
import { auth } from "@/lib/firebase"; // ✅ Firebase 인증 객체 가져오기
import { onAuthStateChanged, signOut, User } from "firebase/auth"; // ✅ User 타입 추가

const NavigationBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { openLogin, openSignup } = useModalStore();
    const [user, setUser] = useState<User | null>(null); // ✅ user 타입 명확하게 지정

    // ✅ Firebase 로그인 상태 감지
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // ✅ currentUser는 'User | null' 타입이므로 에러 없음
        });

        return () => unsubscribe(); // Cleanup 함수
    }, []);

    // ✅ 로그아웃 처리
    const handleLogout = async () => {
        await signOut(auth);
        alert("로그아웃되었습니다.");
        setUser(null); // ✅ 로그아웃 후 상태 초기화
    };

    return (
        <nav className="w-full bg-black sticky top-0 py-2 z-50 shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6 text-white py-6 flex items-center justify-between">
                
                {/* 🖥️ 데스크탑 메뉴 */}
                <div className="hidden text-sm lg:flex space-x-6">
                    <Link href="/performance" className="hover:text-gray-400">공연</Link>
                    <Link href="/venue" className="hover:text-gray-400">공연장</Link>
                    <Link href="/producer" className="hover:text-gray-400">기획/제작사</Link>
                </div>

                {/* 🏠 메인 타이틀 */}
                <Link 
                    href="/" 
                    className="text-xl font-bold uppercase tracking-wide lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
                >
                    Open Your Eyes
                </Link>

                {/* 🔎 로그인 / 로그아웃 */}
                <div className="text-sm flex items-center space-x-4">
                    {/* ✅ 로그인 상태에 따라 UI 변경 */}
                    {user ? (
                        // 🔹 로그인한 경우 → 로그아웃 버튼
                        <button onClick={handleLogout} className="hover:text-gray-300">로그아웃</button>
                    ) : (
                        // 🔹 로그인하지 않은 경우 → 로그인 & 회원가입 버튼
                        <div className="hidden lg:flex space-x-3">
                            <button onClick={openLogin} className="hover:text-gray-300">로그인</button>
                            <button onClick={openSignup} className="hover:text-gray-300">회원가입</button>
                        </div>
                    )}

                    {/* 🍔 모바일 메뉴 버튼 */}
                    <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* 📱 모바일 메뉴 */}
            {menuOpen && (
                <div className="lg:hidden bg-black text-white flex flex-col items-start space-y-4 py-6 px-6">
                    <Link href="/performance" className="hover:text-gray-400">공연</Link>
                    <Link href="/venue" className="hover:text-gray-400">공연장</Link>
                    <Link href="/producer" className="hover:text-gray-400">기획/제작사</Link>

                    {/* 로그인 & 회원가입 버튼 (모바일) */}
                    <div className="w-full border-t border-gray-600 mt-4"></div>
                    <div className="pt-4 mt-2 flex flex-col items-start space-y-2">
                        {user ? (
                            // ✅ 로그인한 경우 → 로그아웃 버튼
                            <button onClick={handleLogout} className="hover:text-gray-400">로그아웃</button>
                        ) : (
                            // ✅ 로그인하지 않은 경우 → 로그인 & 회원가입 버튼
                            <>
                                <button onClick={openLogin} className="hover:text-gray-400">로그인</button>
                                <button onClick={openSignup} className="hover:text-gray-400">회원가입</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationBar;
