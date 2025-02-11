"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useModalStore } from "@/store/modalStore";

// component: 회원가입 모달 //
const SignupModal = () => {

    // state: 모달 상태 //
    const { isSignupOpen, closeSignup, openLogin } = useModalStore();

    // state: 입력값 //
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [_error, setError] = useState("");

    // state: 유효성 검사 활성화 여부 //
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        passwordConfirm: false,
    });

    // variable: 이메일 형식 유효성 검사 //
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // variable: 비밀번호 유효성 검사 (최소 6자 + 영문 대소문자 + 숫자 포함) //
    const isPasswordValid = password.length >= 6 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);

    // variable: 비밀번호 확인 일치 여부 //
    const isPasswordMatched = password === passwordConfirm && password.length > 0;

    // variable: 이름 입력 여부 //
    const isNameEntered = name.trim() !== "";

    // variable: 모든 조건이 충족되면 회원가입 가능 //
    const isValid = isValidEmail && isPasswordValid && isPasswordMatched && isNameEntered;

    // event handler: 회원가입 처리 //
    const handleSignup = async () => {
        if (password !== passwordConfirm) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("회원가입이 완료되었습니다!");
            setName("");
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
            closeSignup(); // 회원가입 모달 닫기
            openLogin(); // 로그인 모달 열기
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // error가 Error 객체인 경우 message를 설정
            } else {
                setError("회원가입 중 예상치 못한 오류가 발생했습니다."); // 기본적인 예외 처리
            }
        }
    };

    if (!isSignupOpen) return null;

    // render: 회원가입 모달 렌더링 //
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
            <div className="bg-black text-white p-6 w-96 border border-[#a9a59f] border-opacity-50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="title-font text-3xl font-semibold tracking-wider">Sign Up</h2>
                    <button
                        onClick={closeSignup}
                        className="text-gray-400 hover:text-gray-200 transition"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-2">
                    {/* 이름 입력 */}
                    <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                        className="w-full p-2 bg-black border-b border-[#a9a59f] text-[#a9a59f] placeholder-[#a9a59f] placeholder-opacity-50 focus:outline-none"
                    />
                    <p className="text-red-500 text-sm min-h-4">
                        {touched.name && !isNameEntered && "이름을 입력하세요."}
                    </p>

                    {/* 이메일 입력 */}
                    <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                        className="w-full p-2 bg-black border-b border-[#a9a59f] text-[#a9a59f] placeholder-[#a9a59f] placeholder-opacity-50 focus:outline-none"
                    />
                    <p className="text-red-500 text-sm min-h-4">
                        {touched.email && !isValidEmail && "올바른 이메일을 입력하세요."}
                    </p>

                    {/* 비밀번호 입력 */}
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                        className="w-full p-2 bg-black border-b border-[#a9a59f] text-[#a9a59f] placeholder-[#a9a59f] placeholder-opacity-50 focus:outline-none"
                    />
                    <p className="text-red-500 text-sm min-h-4">
                        {touched.password && !isPasswordValid &&
                            "비밀번호는 최소 6자 이상이며, 영문 대소문자와 숫자를 포함해야 합니다."
                        }
                    </p>

                    {/* 비밀번호 확인 */}
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, passwordConfirm: true }))}
                        className="w-full p-2 bg-black border-b border-[#a9a59f] text-[#a9a59f] placeholder-[#a9a59f] placeholder-opacity-50 focus:outline-none"
                    />
                    <p className="text-red-500 text-sm min-h-4">
                        {touched.passwordConfirm && !isPasswordMatched && "비밀번호가 일치하지 않습니다."}
                    </p>

                    {/* 회원가입 버튼 */}
                    <button
                        onClick={handleSignup}
                        className={`w-full py-2 font-bold transition 
                        ${isValid ? "bg-[#a9a59f] text-[#F8F5F0] hover:opacity-70" : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"}`}
                        disabled={!isValid}
                    >
                        회원가입
                    </button>
                </div>

                <div className="mt-3 text-center text-sm text-gray-400">
                    이미 계정이 있으신가요?{" "}
                    <span onClick={() => { closeSignup(); openLogin(); }} className="text-[#C0A36E] cursor-pointer hover:underline">
                        로그인
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;