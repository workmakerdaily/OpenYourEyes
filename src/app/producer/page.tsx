"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { debounce } from "@/utils/debounce";
import { ChevronUp } from "lucide-react";
import { ProducerCard } from "@/components/ProducerCard";
import { Producer } from "@/types";

// 🔹 API 요청 함수
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProducersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);

    // 🔹 SWR Infinite Key 설정 (페이지네이션 적용)
    const getKey = (pageIndex: number, previousPageData: Producer[]) => {
        if (previousPageData && previousPageData.length === 0) return null;
        const queryParams = new URLSearchParams({
            type: "mnfct",
            cpage: (pageIndex + 1).toString(),
            rows: "20",
        }).toString();
        return `/api/kopis?${queryParams}`;
    };

    const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);
    const allProducers = data ? [].concat(...data) : [];

    // 🔹 클라이언트 검색 필터 적용
    const filteredProducers = allProducers.filter((producer: Producer) =>
        producer.entrpsnm?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🔹 검색어 변경 시 디바운스 적용
    const handleSearchChange = debounce((value: string) => {
        setSearchTerm(value);
    }, 500);

    // 🔹 Intersection Observer (무한 스크롤 감지)
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
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
            setShowScrollTop(window.scrollY > 300);
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
            <h1 className="title-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin mb-8 text-[#F8F5F0]">
                Producer
            </h1>

            {/* 🔍 검색 입력창 */}
            <input
                type="text"
                placeholder="제작사명을 검색하세요."
                onChange={(e) => handleSearchChange(e.target.value)}
                className="hover:opacity-80 p-2 bg-[#2B2B2B] text-[#a9a59f] placeholder:text-[#a9a59f] w-full sm:w-[250px] md:w-[300px] lg:w-[400px] h-12"
            />

            <hr className="border-t border-[#a9a59f] opacity-50 my-6 sm:my-10 md:my-14 lg:my-18" />

            {/* 🏢 제작사 목록 (카드 형태) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducers.map((producer: Producer, index) => (
                    <ProducerCard
                        key={producer.mt30id}
                        producer={producer}
                        ref={index === filteredProducers.length - 1 ? lastElementRef : null}
                    />
                ))}
            </div>

            {/* ⏳ 로딩 중 표시 */}
            {isValidating && <p className="text-center text-white mt-4">로딩 중...</p>}

            {/* 🔼 상단으로 이동 버튼 */}
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
