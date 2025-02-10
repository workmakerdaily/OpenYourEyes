"use client";

import { useVenueDetail } from "@/hooks/useVenueDetail";
import { useParams } from "next/navigation";

export default function VenueDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const { venue, isLoading, isError } = useVenueDetail(id);


    if (isLoading) return <p className="text-center text-white">로딩 중...</p>;
    if (isError || !venue) return <p className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>;

    return (
        <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6 mt-20">
<h1 className="title-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-[#F8F5F0]">Venue</h1>

<hr className="border-t border-[#a9a59f] opacity-50 my-6 sm:my-10 md:my-14 lg:my-18" />

            {/* 🏛 공연장 이름 */}
            <h1 className="text-4xl font-semibold text-[#F8F5F0] mt-6">{venue.fcltynm}</h1>
            <p className="text-lg text-[#a9a59f]">{venue.adres}</p>

            <hr className="border-t border-[#a9a59f] opacity-50 my-8" />

            {/* 🎭 공연장 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <p className="border-b border-[#2f2f2d] pb-3 text-lg text-[#a9a59f]">
                        <span className="font-thin text-[#a9a59f] pr-16 opacity-70">객석 수</span> {venue.seatscale || "정보 없음"}
                    </p>
                    <p className="border-b border-[#2f2f2d] pb-3 text-lg text-[#a9a59f]">
                        <span className="font-thin text-[#a9a59f] pr-12 opacity-70">공연장 수</span> {venue.mt13cnt || "정보 없음"}
                    </p>
                    <p className="border-b border-[#2f2f2d] pb-3 text-lg text-[#a9a59f]">
                        <span className="font-thin text-[#a9a59f] pr-12 opacity-70">시설 특성</span> {venue.fcltychartr || "정보 없음"}
                    </p>
                    <p className="border-b border-[#2f2f2d] pb-3 text-lg text-[#a9a59f]">
                        <span className="font-thin text-[#a9a59f] pr-12 opacity-70">개관 연도</span> {venue.opende || "정보 없음"}
                    </p>
                </div>

                {/* ♿ 장애인 편의시설 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-[#C0A36E] border-b border-[#C0A36E] pb-2">
                        장애인 편의시설
                    </h2>
                    <p className="text-lg text-[#a9a59f] border-b border-[#2f2f2d] pb-3">
                        <span className="pr-16 opacity-80">주차장</span> {venue.parkbarrier ? "있음" : "없음"}
                    </p>
                    <p className="text-lg text-[#a9a59f] border-b border-[#2f2f2d] pb-3">
                        <span className="pr-16 opacity-80">화장실</span> {venue.restbarrier ? "있음" : "없음"}
                    </p>
                    <p className="text-lg text-[#a9a59f] border-b border-[#2f2f2d] pb-3">
                        <span className="pr-8 opacity-80">엘리베이터</span> {venue.elevbarrier ? "있음" : "없음"}
                    </p>
                    <p className="text-lg text-[#a9a59f] border-b border-[#2f2f2d] pb-3">
                        <span className="pr-16 opacity-80">경사로</span> {venue.runwbarrier ? "있음" : "없음"}
                    </p>
                </div>
            </div>

            {/* 공연장 홈페이지 */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-[#C0A36E] border-b border-[#C0A36E] pb-2">
                    공식 홈페이지
                </h2>
                {venue.relateurl ? (
                    <p className="py-4 text-lg">
                        <a
                            href={venue.relateurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#a9a59f] hover:underline"
                        >
                            {venue.relateurl}
                        </a>
                    </p>
                ) : (
                    <p className="py-4 text-lg text-[#a9a59f]">홈페이지 정보 없음</p>
                )}
            </div>
        </div>
    );
}
