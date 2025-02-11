import { create } from "zustand";

// interface: 모달 상태 관리 인터페이스 //
interface ModalState {
    isLoginOpen: boolean;
    isSignupOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    openSignup: () => void;
    closeSignup: () => void;
}

// state: Zustand를 활용한 모달 상태 관리 //
export const useModalStore = create<ModalState>((set) => ({
    isLoginOpen: false,
    isSignupOpen: false,

    // function: 로그인 모달 열기 (회원가입 모달 닫기) //
    openLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),

    // function: 로그인 모달 닫기 //
    closeLogin: () => set({ isLoginOpen: false }),

    // function: 회원가입 모달 열기 (로그인 모달 닫기) //
    openSignup: () => set({ isSignupOpen: true, isLoginOpen: false }),

    // function: 회원가입 모달 닫기 //
    closeSignup: () => set({ isSignupOpen: false }),
}));
