"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import PerformanceCard from "@/components/PerformanceCard";
import { debounce } from "@/utils/debounce";
import { ChevronUp } from "lucide-react";

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

const areaMapping: Record<string, string> = {
    "서울특별시": "11",
    "부산광역시": "26",
    "대구광역시": "27",
    "인천광역시": "28",
    "광주광역시": "29",
    "대전광역시": "30",
    "울산광역시": "31",
    "세종특별자치시": "36",
    "경기도": "41",
    "강원특별자치도": "51",
    "충청북도": "43",
    "충청남도": "44",
    "전라북도": "45",
    "전라남도": "46",
    "경상북도": "47",
    "경상남도": "48",
    "제주특별자치도": "50",
}

const genreOptions = [
    { label: "전체", value: "" },
    ...Object.entries(genreMapping).map(([label, value]) => ({ label, value })),
];

const areaOptions = [
    { label: "전체", value: "" },
    ...Object.entries(areaMapping).map(([label, value]) => ({ label, value })),
];

const statusOptions = [
    { label: "전체", value: "" },
    { label: "공연예정", value: "공연예정" },
    { label: "공연중", value: "공연중" },
    { label: "공연완료", value: "공연완료" },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PerformancesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("");     // 장르 필터
    const [area, setArea] = useState("");       // 지역 필터
    const [status, setStatus] = useState("");   // 상태 필터
    const [selectedDate, setSelectedDate] = useState("20250208");
    const [showScrollTop, setShowScrollTop] = useState(false);

    // 🔹 SWR Infinite Key 설정 (필터만 API 요청)
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && previousPageData.length === 0) return null;

        const queryParams = new URLSearchParams({
            type: "pblprfr",
            stdate: selectedDate,
            eddate: selectedDate,
            areacode: area,
            prfstate: status,
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
        const matchArea = area ? performance.area === area : true;
        const matchStatus = status ? performance.prfstate === status : true;
        return matchSearch && matchGenre && matchArea && matchStatus;
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
        console.log(value);
        if (value === "전체") {
            setGenre("");
        }
    };

    const handleAreaChange = (value: string) => {
        setArea(value);
        setSize(1);
        console.log(value);
        if (value === "전체") {
            setArea("");
        }
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        setSize(1);
        console.log(value);
        if (value === "전체") {
            setStatus("");
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

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300); // 300px 이상 스크롤 시 버튼 표시
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 🔹 화면 맨 위로 스크롤하는 함수
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6 mt-20">
            <h1 className="title-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin mb-8 text-[#F8F5F0]">Performance</h1>

            {/* 🔍 검색 및 필터 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center w-full">
    {/* 검색창 (w-full 유지, 작은 화면에서 필터들과 함께 아래로 내려감) */}
    <input
        type="text"
        placeholder="공연명 또는 공연시설을 검색하세요."
        onChange={(e) => handleSearchChange(e.target.value)}
        className="hover:opacity-80 p-2 bg-[#2B2B2B] text-[#a9a59f] placeholder:text-[#a9a59f] w-full sm:w-1/3 h-12"
    />
    
    <div className="flex flex-row sm:flex-row gap-4 w-full sm:w-auto items-center">
        <select
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value)}
            className="cursor-pointer text-[#a9a59f] bg-[#2B2B2B] text-sm hover:opacity-80 transition h-12 min-w-[140px]"
        >
            {genreOptions.map((option) => (
                <option key={option.value} value={option.label}>
                    {option.label}
                </option>
            ))}
        </select>
        <select
            value={area}
            onChange={(e) => handleAreaChange(e.target.value)}
            className="cursor-pointer text-[#a9a59f] bg-[#2B2B2B] text-sm hover:opacity-80 transition h-12 min-w-[140px]"
        >
            {areaOptions.map((option) => (
                <option key={option.value} value={option.label}>
                    {option.label}
                </option>
            ))}
        </select>
        <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="cursor-pointer text-[#a9a59f] bg-[#2B2B2B] text-sm hover:opacity-80 transition h-12 min-w-[140px]"
        >
            {statusOptions.map((option) => (
                <option key={option.value} value={option.label}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
</div>
            <hr className="border-t border-[#a9a59f] opacity-50 my-4 sm:my-8 md:my-12 lg:my-16" />

            {/* 🎭 공연 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPerformances.map((performance: any, index) => {
                    if (index === filteredPerformances.length - 1) {
                        return <div ref={lastElementRef} key={performance.mt20id}><PerformanceCard performance={performance} /></div>;
                    }
                    return <PerformanceCard key={performance.mt20id} performance={performance} />;
                })}
            </div>

            {/* ⏳ 로딩 중 표시 */}
            {isValidating && <p className="text-center text-white mt-4">로딩 중...</p>}

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-[#F8F5F0] text-black p-3 rounded-full shadow-lg hover:opacity-70 transition"
                >
                    <ChevronUp size={24} />
                </button>
            )}
        </div>
    );
}
