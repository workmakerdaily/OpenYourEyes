"use client";

import { Producer } from "@/types";
import { forwardRef } from "react";

interface ProducerProps {
    producer: Producer;
}

// ✅ `forwardRef`를 사용하여 ref를 `div`에 전달
export const ProducerCard = forwardRef<HTMLDivElement, ProducerProps>((props , ref) => {
    const { producer } = props;
    const relateurl = producer.relateurl?.trim(); // 🔹 공백 제거
    const isValidUrl = relateurl && relateurl !== "-" && relateurl !== "";

    return (
        <div
            ref={ref}
            className="border border-[#a9a59f] border-opacity-40 text-[#F8F5F0] p-4 flex flex-col h-full hover:border-[#a9a59f] transition"
        >
            <h2 className="text-xl font-semibold text-[#C0A36E] mb-2">
                {producer.entrpsnm}
            </h2>

            {/* 최신작품 제목 길이 제한 (20자 초과 시 "..." 처리) */}
            <p className="text-sm text-[#a9a59f] truncate" title={producer.prfnm}>
                <strong>최신작품:</strong> {producer.prfnm?.length > 20 ? producer.prfnm.slice(0, 20) + "..." : producer.prfnm || "정보 없음"}
            </p>

            <p className="text-sm text-[#a9a59f]"><strong>장르:</strong> {producer.genrenm || "정보 없음"}</p>

            {/* 🔹 홈페이지 링크가 `"-"`, 빈 값 `""`, 공백 `" "`이 아닐 때만 표시 */}
            {isValidUrl && (
                <a
                    href={relateurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-6 text-[#a9a59f] hover:opacity-60 text-sm"
                >
                    🌐 홈페이지 방문하기
                </a>
            )}
        </div>
    );
});

ProducerCard.displayName = "ProducerCard";
