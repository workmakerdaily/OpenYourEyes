"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/modalStore";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuthStore();
    const { openLogin } = useModalStore();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user && pathname !== "/") {
            openLogin(); // 🔹 로그인 모달 열기
            router.replace("/"); // 🔹 로그인되지 않았으면 메인 페이지로 리디렉션
        }
    }, [user, isLoading, pathname, openLogin, router]);

    return <>{children}</>;
}
