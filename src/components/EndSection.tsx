"use client";

import Link from "next/link";

// component: 마지막 섹션 //
const EndSection = () => {

    // render: 마지막 섹션 렌더링링 //
    return (
        <section className="relative bg-[#1a1a1a] text-white py-40 text-center">
            <div className="max-w-4xl mx-auto">
                {/* 🎭 배경 텍스트 (장식용) */}
                <h2 className="title-font absolute inset-0 flex items-center justify-center text-[6rem] lg:text-[10rem] font-bold text-white text-opacity-10 tracking-wide select-none">
                    OPEN YOUR EYES
                </h2>

                {/* ✨ 메인 텍스트 */}
                <h3 className="relative text-4xl md:text-5xl font-semibold leading-snug tracking-wider">
                    당신의 작품을 찾아보세요
                </h3>
                <p className="relative text-lg opacity-70 mt-4">
                    다양한 공연과 예술 작품을 탐색하고, 잊지 못할 순간을 경험하세요.
                </p>

                {/* 🔍 CTA 버튼 */}
                <div className="relative mt-8">
                    <Link
                        href="/performance"
                        className="inline-block text-[#C0A36E] px-6 py-3 text-lg font-medium rounded-lg shadow-lg hover:opacity-50 transition duration-300"
                    >
                        지금 탐색하기
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default EndSection;