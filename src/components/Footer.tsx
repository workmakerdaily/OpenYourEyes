"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white py-10 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-sm">© 2025 Open Your Eyes. All rights reserved.</p>
                <p className="text-xs mt-2 opacity-60">
                    공연 데이터 제공: (재)예술경영지원센터 공연예술통합전산망 
                    <Link href="https://www.kopis.or.kr" target="_blank" className="underline">
                        www.kopis.or.kr
                    </Link>
                </p>
            </div>
        </footer>
    );
}
