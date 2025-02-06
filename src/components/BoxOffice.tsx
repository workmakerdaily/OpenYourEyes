"use client";

import Image from "next/image";
import { useBoxOfficeByDate } from "@/hooks/useBoxOfficeByDate";

const BoxOffice = ({ date }: { date: string }) => {
    const { boxOffice, isLoading, isError } = useBoxOfficeByDate(date);

    if (isError) return <p className="text-red-500">데이터를 불러오는 중 오류 발생</p>;
    if (isLoading) return <p className="text-gray-500">로딩 중...</p>;

    // ✅ rnum이 있는 데이터만 필터링 후, 숫자로 변환 후 정렬
    const top3 = [...boxOffice]
        .filter(show => show.rnum) // `rnum`이 있는 데이터만 사용
        .sort((a, b) => Number(a.rnum) - Number(b.rnum)) // 순위 낮은 순으로 정렬
        .slice(0, 3); // 상위 3개만 가져오기

    return (
        <div className="flex flex-col items-center space-y-4 p-4 bg-gray-900 text-white rounded-lg">
            <h2 className="text-xl font-bold">TOP 3 박스오피스</h2>
            <div className="grid grid-cols-3 gap-4">
                {top3.map((show) => (
                    <div key={show.mt20id} className="flex flex-col items-center">
                        <Image
                            src={show.poster}
                            alt={show.prfnm}
                            width={200}
                            height={300}
                            className="rounded-md shadow-lg"
                        />
                        <p className="text-center mt-2">{show.prfnm}</p>
                        <p className="text-sm text-gray-400">순위: {show.rnum}</p> {/* ✅ 박스오피스 순위 표시 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoxOffice;
