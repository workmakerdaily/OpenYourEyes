"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useModalStore } from "@/store/modalStore";

// Zustand를 활용한 상태 관리
interface ModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export default function LoginModal() {
    const { isLoginOpen, closeLogin, openSignup } = useModalStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // 이메일 형식 확인 (간단한 정규식)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 비밀번호 길이 검사 (최소 6자 이상)
    const isPasswordLongEnough = password.length >= 6;

    // 비밀번호에 영문 대소문자 및 숫자가 포함되어 있는지 확인
    const isPasswordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);

    // 이메일과 비밀번호가 모두 유효해야 로그인 버튼 활성화
    const isValid = isValidEmail && isPasswordLongEnough && isPasswordStrong;

    // 로그인 버튼 클릭 시 오류 메시지 표시
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("로그인되셨습니다.");
            closeLogin();
        } catch (error: any) {
            setError("이메일 또는 비밀번호가 일치하지 않습니다."); // 🔴 Firebase 로그인 오류 처리
        }
    };

    if (!isLoginOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
            <div className="bg-black text-white p-8 w-96 border border-[#a9a59f] border-opacity-50">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="title-font text-4xl font-semibold tracking-wider">Login</h2>
                    <button
                        onClick={closeLogin}
                        className="text-gray-400 hover:text-gray-200 transition"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    {/* 이메일 입력 */}
                    <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-black border-b border-[#a9a59f]
                        text-[#a9a59f] placeholder-[#a9a59f] placeholder-opacity-50 focus:outline-none"
                    />

                    {/* 비밀번호 입력 */}
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-black border-b border-[#a9a59f]
                        text-[#a9a59f] placeholder-[#a9a59f] placeholder-opacity-50 focus:outline-none"
                    />

                    {/* 🔴 로그인 버튼 클릭 후에만 오류 메시지 표시 */}
                    {showError && (
                        <p className="text-red-500 text-sm">이메일이나 비밀번호가 일치하지 않습니다.</p>
                    )}

                    {/* 로그인 버튼 */}
                    <button
                        onClick={handleLogin}
                        className={`w-full py-3 font-bold rounded-md transition 
                        ${isValid ? "bg-[#a9a59f] text-[#F8F5F0] hover:opacity-70" : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"}`}
                    >
                        로그인
                    </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-400">
                    계정이 없으신가요?{" "}
                    <span onClick={() => { closeLogin(); openSignup(); }} className="text-[#C0A36E] cursor-pointer hover:underline">
                        회원가입
                    </span>
                </div>
            </div>
        </div>
    );
}
