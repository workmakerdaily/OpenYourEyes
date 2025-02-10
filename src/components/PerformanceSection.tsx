"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { usePerformancesByDate } from "@/hooks/usePerformancesByDate";
import { Performance } from "@/types";
import Image from "next/image";

// ✅ 한국 시간(KST) 변환 함수
const convertToKST = (date: Date) => {
    const kstOffset = 9 * 60;
    return new Date(date.getTime() + kstOffset * 60 * 1000);
};

export default function PerformanceSection() {
    const today = convertToKST(new Date()).toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const { performances, isLoading } = usePerformancesByDate(selectedDate);

    const dateScrollRef = useRef<HTMLDivElement | null>(null);
    const perfScrollRef = useRef<HTMLDivElement | null>(null);

    const year = selectedDate.split("-")[0];
    const month = selectedDate.split("-")[1];

    const daysOfWeek = useMemo(() => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"], []);

    const [dates, setDates] = useState<{ 
        day: number; 
        fullDate: string; 
        dayOfWeek: string; 
        isToday: boolean; 
        hasPerformance: boolean; 
    }[]>([]);

    useEffect(() => {
        const generateDatesOfMonth = () => {
            const newDates = [];
            const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1);
            const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();

            for (let day = 1; day <= lastDay; day++) {
                const date = new Date(firstDay.getFullYear(), firstDay.getMonth(), day);
                const kstDate = convertToKST(date);
                const fullDate = kstDate.toISOString().split("T")[0];

                newDates.push({
                    day,
                    fullDate,
                    dayOfWeek: daysOfWeek[kstDate.getDay()],
                    isToday: fullDate === today,
                    hasPerformance: false, // 초기값: 공연 없음
                });
            }
            setDates(newDates);
        };

        generateDatesOfMonth();
    }, [year, month, daysOfWeek, today]); // ✅ 빠진 의존성 추가

    useEffect(() => {
        if (!isLoading) {
            setDates((prevDates) =>
                prevDates.map((date) => {
                    const dateObj = new Date(date.fullDate);
                    const hasPerformance = performances.some((perf) => {
                        const startDate = convertToKST(new Date(perf.prfpdfrom));
                        const endDate = convertToKST(new Date(perf.prfpdto));

                        return startDate <= dateObj && dateObj <= endDate;
                    });

                    return { ...date, hasPerformance };
                })
            );
        }
    }, [performances, isLoading]);

    // ✅ 마우스 휠을 이용해 가로 스크롤 가능하게 만들기 (useEffect에서 직접 호출)
    useEffect(() => {
        const scrollContainer = dateScrollRef.current;
        if (!scrollContainer) return;

        const handleWheelScroll = (event: WheelEvent) => {
            event.preventDefault();
            scrollContainer.scrollBy({
                left: event.deltaY * 4, // 🔹 속도 4배 증가
                behavior: "smooth",
            });
        };

        scrollContainer.addEventListener("wheel", handleWheelScroll, { passive: false });

        return () => {
            scrollContainer.removeEventListener("wheel", handleWheelScroll);
        };
    }, []); // ✅ enableHorizontalScroll 제거하고 useEffect에서 직접 적용

    useEffect(() => {
        const scrollContainer = perfScrollRef.current;
        if (!scrollContainer) return;

        const handleWheelScroll = (event: WheelEvent) => {
            event.preventDefault();
            scrollContainer.scrollBy({
                left: event.deltaY * 4,
                behavior: "smooth",
            });
        };

        scrollContainer.addEventListener("wheel", handleWheelScroll, { passive: false });

        return () => {
            scrollContainer.removeEventListener("wheel", handleWheelScroll);
        };
    }, []); // ✅ enableHorizontalScroll 제거하고 useEffect에서 직접 적용

    return (
        <section className="bg-[#F8F5F0] text-black py-10">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6">
                
                {/* 🗓 연도 및 월 표시 */}
                <header className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-semibold">{year}.{month}</h2>
                </header>

                {/* 📅 요일 및 날짜 선택 */}
                <div 
                    ref={dateScrollRef} 
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                >
                    {dates.map((date) => (
                        <div
                            key={date.fullDate}
                            className={`flex flex-col items-center text-center w-10 cursor-pointer transition ${
                                date.fullDate === selectedDate 
                                    ? "text-black font-bold"
                                    : date.hasPerformance 
                                    ? "text-black font-thin hover:opacity-30" 
                                    : "text-gray-600"
                            }`}
                            onClick={() => setSelectedDate(date.fullDate)}
                        >
                            <span className="text-xs">{date.dayOfWeek}</span>
                            <span className={`text-xs ${date.isToday ? "border-b-2 border-black" : ""}`}>
                                {date.day}
                            </span>
                        </div>
                    ))}
                </div>

                {/* 🎭 선택한 날짜의 공연 목록 */}
                <div className="mt-6 min-h-[360px]">
                    {isLoading ? (
                        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="min-w-[220px] max-w-[220px] flex-shrink-0 animate-pulse">
                                    <div className="w-full h-[300px] bg-gray-300 rounded-lg"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
                                </div>
                            ))}
                        </div>
                    ) : performances.length > 0 ? (
                        <div
                            ref={perfScrollRef}
                            className="flex gap-6 overflow-x-auto scrollbar-hide"
                        >
                            {performances.map((perf: Performance) => (
                                <div key={perf.mt20id} className="min-w-[220px] max-w-[220px] flex-shrink-0">
                                    <div className="relative w-full h-[300px] bg-gray-200 overflow-hidden">
                                        <Image 
                                            src={perf.poster}
                                            alt={perf.prfnm}
                                            width={220}
                                            height={300}
                                            className="w-full h-[300px] object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-2 text-md font-semibold">{perf.prfnm}</h3>
                                    <p className="text-sm text-gray-600">{perf.fcltynm}</p>
                                    <p className="text-sm text-gray-500">{perf.prfpdfrom} ~ {perf.prfpdto}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">해당 날짜의 공연이 없습니다.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
