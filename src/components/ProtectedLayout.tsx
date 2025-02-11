"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/modalStore";

// component: 보호된 레이아웃 //
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {

    // state: 사용자 인증 상태 //
    const { user, isLoading } = useAuthStore();
    const { openLogin } = useModalStore();

    // variable: 현재 경로 및 라우터 //
    const pathname = usePathname();
    const router = useRouter();

    // effect: 로그인 여부 확인 및 리디렉션 //
    useEffect(() => {
        if (!isLoading && !user && pathname !== "/") {
            openLogin(); // 로그인 모달 열기
            router.replace("/"); // 로그인되지 않았으면 메인 페이지로 리디렉션
        }
    }, [user, isLoading, pathname, openLogin, router]);

    // render: 인증된 사용자만 자식 컴포넌트 렌더링 //
    return <>{children}</>;
}

export default ProtectedLayout;