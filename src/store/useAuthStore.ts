import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// interface: 인증 상태 관리 인터페이스 //
interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
}

// state: Zustand를 활용한 인증 상태 관리 //
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true, // 처음에는 Firebase에서 로그인 여부를 확인할 때까지 `true`

    // function: Firebase에서 로그인 상태 변경 시 Zustand에 반영 //
    setUser: (user) => set({ user, isLoading: false }),
}));

// effect: Firebase에서 로그인 상태 변화를 감지하여 Zustand 상태 업데이트 //
onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
});
