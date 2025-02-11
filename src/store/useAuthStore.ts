import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true, // 처음에는 Firebase에서 로그인 여부를 확인할 때까지 `true`
    setUser: (user) => set({ user, isLoading: false }),
}));

// Firebase에서 로그인 상태 변화를 감지하여 Zustand에 반영
onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
});
