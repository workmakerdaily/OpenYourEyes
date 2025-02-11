import { create } from "zustand";

interface ModalState {
    isLoginOpen: boolean;
    isSignupOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    openSignup: () => void;
    closeSignup: () => void;
}

// Zustand를 활용한 모달 상태 관리
export const useModalStore = create<ModalState>((set) => ({
    isLoginOpen: false,
    isSignupOpen: false,
    openLogin: () => set({ isLoginOpen: true, isSignupOpen: false }),
    closeLogin: () => set({ isLoginOpen: false }),
    openSignup: () => set({ isSignupOpen: true, isLoginOpen: false }),
    closeSignup: () => set({ isSignupOpen: false }),
}));
