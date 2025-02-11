"use client";

import Image from "next/image";
import { useBoxOfficeByDate } from "@/hooks/useBoxOfficeByDate";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BoxOffice = () => {
    const { boxOffice, isLoading, isError } = useBoxOfficeByDate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById("box-office-section");
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 페이지 로드 시 확인

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isError) return <p className="text-red-500">데이터를 불러오는 중 오류 발생</p>;
    if (isLoading) return <p className="text-gray-500">로딩 중...</p>;

    // ✅ `rnum` 기준으로 오름차순 정렬 후 상위 3개만 가져오기
    const topPerformances = [...boxOffice]
        .sort((a, b) => Number(a.rnum) - Number(b.rnum))
        .slice(0, 3);

    return (
        <section
            id="box-office-section"
            className="relative max-w-screen-xl mx-auto px-6 md:px-8 lg:px-6 py-48 text-white"
        >
            <div className="max-w-7xl mx-auto relative">
                {/* 🔹 배경 텍스트 애니메이션 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center sm:gap-0 md:gap-44 lg:gap-36 justify-center text-white font-bold z-0"
                >
                    <h2 className="title-font text-[clamp(3rem,8vw,8rem)] tracking-[clamp(0.5rem,3vw,3.5rem)] leading-none">
                        TOP BOX
                    </h2>
                    <h2 className="title-font text-[clamp(3rem,8vw,8rem)] tracking-[clamp(0.5rem,3vw,3.5rem)] leading-none">
                        OFFICE
                    </h2>
                </motion.div>

                {/* 📌 포스터 리스트 */}
                <div className="flex flex-wrap justify-center gap-24 relative z-10">
                    {topPerformances.map((show) => (
                        <div
                            key={show.mt20id}
                            className="flex flex-col items-center w-[160px] space-y-2"
                        >
                            {/* 🎭 포스터 이미지 */}
                            <div className="w-[160px] h-[220px] relative">
                                <Image
                                    src={show.poster}
                                    alt={show.prfnm}
                                    width={160}
                                    height={220}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BoxOffice;
