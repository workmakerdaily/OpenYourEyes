"use client";

import { useState, useRef, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import PerformanceCard from "@/components/PerformanceCard";
import { debounce } from "@/utils/debounce";

// ✅ 장르 코드 매핑
const genreMapping: Record<string, string> = {
    "연극": "AAAA",
    "무용(서양/한국무용)": "BBBC",
    "대중무용": "BBBE",
    "서양음악(클래식)": "CCCA",
    "한국음악(국악)": "CCCC",
    "대중음악": "CCCD",
    "북한": "EEEA",
    "서커스/마술": "EEEB",
    "뮤지컬": "GGGA",
};

const genreOptions = [
    { label: "전체", value: "" },
    { label: "연극", value: "AAAA" },
    { label: "무용(서양/한국무용)", value: "BBBC" },
    { label: "대중무용", value: "BBBE" },
    { label: "서양음악(클래식)", value: "CCCA" },
    { label: "한국음악(국악)", value: "CCCC" },
    { label: "대중음악", value: "CCCD" },
    { label: "북한", value: "EEEA" },
    { label: "서커스/마술", value: "EEEB" },
    { label: "뮤지컬", value: "GGGA" },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PerformancesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState(""); // 🔹 장르 필터 추가
    const [region, setRegion] = useState("");
    const [status, setStatus] = useState("");
    const [selectedDate, setSelectedDate] = useState("20250208");

    // 🔹 SWR Infinite Key 설정 (필터만 API 요청)
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && previousPageData.length === 0) return null;

        const queryParams = new URLSearchParams({
            type: "pblprfr",
            stdate: selectedDate,
            eddate: selectedDate,
            areacode: region,
            openrun: status,
            cpage: (pageIndex + 1).toString(),
            rows: "50",
        }).toString();

        return `/api/kopis?${queryParams}`;
    };

    const { data, size, setSize, isValidating, mutate } = useSWRInfinite(getKey, fetcher);
    const allPerformances = data ? [].concat(...data) : [];

    // 🔹 클라이언트에서 공연명, 시설명, 장르 필터링 적용
    const filteredPerformances = allPerformances.filter((performance: any) => {
        const matchSearch =
            performance.prfnm.includes(searchTerm) || performance.fcltynm.includes(searchTerm);
        const matchGenre = genre ? performance.genrenm === genre : true;
        return matchSearch && matchGenre;
    });

    // 🔹 검색어 변경 시 필터링 (디바운스 적용)
    const handleSearchChange = debounce((value: string) => {
        setSearchTerm(value);
    }, 500);

    // 🔹 필터 변경 시 첫 페이지부터 다시 로드
    const handleFilterChange = (setter: Function, value: string) => {
        setter(value);
        setSize(1);
        mutate([], false); // ✅ 기존 데이터 초기화 후 새로운 데이터 요청
    };

    // 🔹 장르 필터 변경 시 전체 선택 처리
    const handleGenreChange = (value: string) => {
        setGenre(value);
        setSize(1);
        if (value === "") {
            mutate([], false); // ✅ "전체" 선택 시 데이터를 초기화하고 다시 불러옴
        }
    };

    // 🔹 Intersection Observer (무한 스크롤)
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isValidating) return;
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setSize(size + 1);
                }
            });
            if (node) observerRef.current.observe(node);
        },
        [isValidating, setSize, size]
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-white">공연 목록</h1>

            {/* 🔍 검색 및 필터 */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="공연명 또는 공연시설 검색..."
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="p-2 border border-gray-600 rounded w-full sm:w-1/3"
                />
                <select
                    value={genre}
                    onChange={(e) => handleGenreChange(e.target.value)} // ✅ "전체" 선택 처리
                    className="p-2 border rounded"
                >
                    {genreOptions.map((option) => (
                        <option key={option.value} value={option.label}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <select
                    value={region}
                    onChange={(e) => handleFilterChange(setRegion, e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">지역 선택</option>
                    <option value="11">서울</option>
                    <option value="28">부산</option>
                    <option value="41">경기도</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => handleFilterChange(setStatus, e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">공연 상태</option>
                    <option value="Y">공연 중</option>
                    <option value="N">공연 예정</option>
                </select>
            </div>

            {/* 🎭 공연 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPerformances.map((performance: any, index) => {
                    if (index === filteredPerformances.length - 1) {
                        return <div ref={lastElementRef} key={performance.mt20id}><PerformanceCard performance={performance} /></div>;
                    }
                    return <PerformanceCard key={performance.mt20id} performance={performance} />;
                })}
            </div>

            {/* ⏳ 로딩 중 표시 */}
            {isValidating && <p className="text-center text-white mt-4">로딩 중...</p>}
        </div>
    );
}
