"use client";

import Image from "next/image";
import { useBoxOfficeByDate } from "@/hooks/useBoxOfficeByDate";

const BoxOffice = ({ date }: { date: string }) => {
    const { boxOffice, isLoading, isError } = useBoxOfficeByDate(date);

    if (isError) return <p className="text-red-500">데이터를 불러오는 중 오류 발생</p>;
    if (isLoading) return <p className="text-gray-500">로딩 중...</p>;

    // ✅ `rnum` 기준으로 오름차순 정렬 후 상위 3개만 가져오기
    const topPerformances = [...boxOffice]
        .sort((a, b) => Number(a.rnum) - Number(b.rnum))
        .slice(0, 3);

    return (
        <section className="py-16 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-8 text-center">Top 3 박스오피스 공연</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topPerformances.map((show) => (
                        <div
                            key={show.mt20id}
                            className="relative group bg-[#1a1a1a] overflow-hidden"
                        >
                            {/* 포스터 이미지 */}
                            <Image
                                src={show.poster}
                                alt={show.prfnm}
                                width={200}
                                height={300}
                                className="w-full h-full object-contain"
                            />
                            
                            {/* 포스터 위에 텍스트 */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <h3 className="text-lg font-semibold">{show.prfnm}</h3>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BoxOffice;
