"use client";

import { useState, useRef, useEffect } from "react";
import { useVenuesByDate } from "@/hooks/useVenuesByDate";
import { debounce } from "@/utils/debounce";

// ✅ 지역 코드 매핑
const areaMapping: Record<string, string> = {
    "서울": "11",
    "부산": "26",
    "대구": "27",
    "인천": "28",
    "광주": "29",
    "대전": "30",
    "울산": "31",
    "세종": "36",
    "경기": "41",
    "강원": "51",
    "충북": "43",
    "충남": "44",
    "전북": "45",
    "전남": "46",
    "경북": "47",
    "경남": "48",
    "제주": "50",
};

// ✅ 지역 옵션 리스트 (전체 포함)
const areaOptions = [
    { label: "전체", value: "" },
    ...Object.keys(areaMapping).map((label) => ({ label, value: label })),
];

export default function VenuesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [area, setArea] = useState(""); // ✅ 지역 필터 변수명 변경

    const { venues, isLoading, isError, isValidating, loadMore } = useVenuesByDate(searchTerm);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLTableRowElement | null>(null);

    // 🔹 Intersection Observer 설정 (무한 스크롤)
    useEffect(() => {
        if (isValidating) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                loadMore();
            }
        });

        if (lastElementRef.current) observerRef.current.observe(lastElementRef.current);
    }, [isValidating, loadMore]);

    const handleSearchChange = debounce((value: string) => {
        setSearchTerm(value);
    }, 500);

    const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setArea(event.target.value);
    };

    // 🔹 공연장명 + 지역(시도, 구군) 필터링 적용
    const filteredVenues = venues.filter((venue) =>
        (searchTerm ? venue.fcltynm.includes(searchTerm) || venue.sidonm.includes(searchTerm) || venue.gugunnm.includes(searchTerm) : true) &&
        (area ? venue.sidonm === area : true) // ✅ 지역명으로 비교
    );

    return (
        <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6 mt-20">
            <h1 className="title-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin mb-8 text-[#F8F5F0]">Venue</h1>

            {/* 🔍 검색 입력창 + 지역 필터 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="공연장명 또는 지역을 검색하세요."
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="hover:opacity-80 p-2 bg-[#2B2B2B] text-[#a9a59f] placeholder:text-[#a9a59f] w-full sm:w-1/3 h-12"
                />

                <select
                    value={area}
                    onChange={handleAreaChange}
                    className="cursor-pointer text-[#a9a59f] bg-[#2B2B2B] text-sm hover:opacity-80 transition h-12 min-w-[140px]"
                >
                    {areaOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <hr className="border-t border-[#a9a59f] opacity-50 my-4 sm:my-8 md:my-12 lg:my-16" />

            {/* 🏛 공연장 목록 (게시판 스타일) */}
            <div className="text-[#F8F5F0]">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-[#6d5e43] text-left text-xs md:text-sm lg:text-sm text-[#C0A36E]">
                            <th className="p-3 w-3/5">공연장명</th>
                            <th className="p-3 w-1/5">지역</th>
                            <th className="p-3 hidden md:table-cell w-1/5">시설특성</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVenues.map((venue, index) => (
                            <tr
                                key={venue.mt10id}
                                className="border-b border-opacity-40 border-[#a9a59f] hover:border-[#a9a59f] text-[#a9a59f] hover:text-[#dfd9d0] transition"
                                ref={index === filteredVenues.length - 1 ? lastElementRef : null}
                            >
                                <td className="p-3 text-xs py-4 sm:py-4 sm:text-sm md:py-6 md:text-base lg:py-8 lg:text-base">{venue.fcltynm}</td>
                                <td className="p-3 text-xs py-4 sm:py-4 sm:text-sm md:py-6 md:text-base lg:py-8 lg:text-base">{venue.sidonm} {venue.gugunnm}</td>
                                <td className="p-3 hidden md:table-cell py-2 text-xs sm:py-4 sm:text-sm md:py-6 md:text-base lg:py-8 lg:text-base">{venue.fcltychartr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isLoading && <p className="text-center text-white mt-4">로딩 중...</p>}
            {isError && <p className="text-center text-red-500 mt-4">데이터를 불러오는 중 오류가 발생했습니다.</p>}
        </div>
    );
}
