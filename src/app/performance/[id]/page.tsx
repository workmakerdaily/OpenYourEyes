"use client";

import { useParams } from "next/navigation";
import { usePerformanceDetail } from "@/hooks/usePerformanceDetail";
import Image from "next/image";

// component: 공연 상세 페이지 //
export default function PerformanceDetailPage() {
    
    // state: URL 파라미터에서 공연 ID 가져오기 //
    const { id } = useParams();

    // state: 공연 상세 데이터 가져오기 //
    const { performance, isLoading, isError } = usePerformanceDetail(id as string);

    if (isLoading) return <p className="text-center text-white">로딩 중...</p>;
    if (isError || !performance) return <p className="text-center text-red-500">공연 정보를 불러올 수 없습니다.</p>;

    console.log(performance.relates)

    // render: 공연 상세 페이지 UI //
    return (
        <div className="container max-w-screen-xl mx-auto px-4 md:px-8 lg:px-6 mt-20">
            
            <h1 className="title-font text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-[#F8F5F0]">Performance</h1>

            <hr className="border-t border-[#a9a59f] opacity-50 my-6 sm:my-10 md:my-14 lg:my-18" />

            <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10 items-stretch">
    {/* 🎭 공연 포스터 (모바일: 전체 너비, 데스크탑: 고정 크기) */}
    <div className="flex items-stretch">
        <div className="w-full md:w-[400px] md:min-w-[400px] min-h-[500px] flex items-center justify-center">
            <Image
                src={performance.poster || "/default-poster.jpg"}
                alt={performance.prfnm}
                width={400}
                height={500}
                className="w-full h-full object-cover flex-shrink-0"
            />
        </div>
    </div>

    {/* 공연 정보 (유동 크기) */}
    <div className="flex flex-col gap-6 min-h-[500px]">
        {/* 공연 정보 */}
        <div className="flex-1">
            <p className="text-2xl text-[#F8F5F0]"><strong>{performance.prfnm}</strong></p>
            <p className="border-b border-[#2f2f2d] py-2 text-md text-[#a9a59f]"><span className="pr-16 opacity-70">장소</span>{performance.fcltynm}</p>
            <p className="border-b border-[#2f2f2d] py-2 text-md text-[#a9a59f]"><span className="pr-16 opacity-70">기간</span>{performance.prfpdfrom} ~ {performance.prfpdto}</p>
            <p className="border-b border-[#2f2f2d] py-2 text-md text-[#a9a59f]"><span className="pr-16 opacity-70">장르</span>{performance.genrenm || "정보 없음"}</p>
            <p className="border-b border-[#2f2f2d] py-2 text-md text-[#a9a59f]"><span className="pr-12 opacity-70">런타임</span>{performance.prfruntime || "정보 없음"}</p>
            <p className="border-b border-[#2f2f2d] py-2 text-md text-[#a9a59f]"><span className="pr-7 opacity-70">관람 연령</span>{performance.prfage || "정보 없음"}</p>
            <p className="border-b border-[#2f2f2d] py-2 text-md text-[#a9a59f]"><span className="pr-7 opacity-70">티켓 가격</span>{performance.pcseguidance || "정보 없음"}</p>
            <p className="border-b border-[#2f2f2d] py-2 text-md text-[#a9a59f]"><span className="pr-7 opacity-70">공연 상태</span>{performance.prfstate}</p>
        </div>

        {/* 출연진 & 제작진 */}
        {(performance.prfcast || performance.prfcrew) && (
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#C0A36E] border-b border-[#C0A36E] pb-2">출연진 & 제작진</h2>
                {performance.prfcast && <p className="py-2 text-md text-[#a9a59f]"><span className="pr-10 opacity-70">출연진</span> {performance.prfcast}</p>}
                {performance.prfcrew && <p className="py-2 text-md text-[#a9a59f]"><span className="pr-10 opacity-70">제작진</span> {performance.prfcrew}</p>}
            </div>
        )}

        {/* 공연 시간 안내 */}
        {performance.dtguidance && (
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-[#C0A36E] border-b border-[#C0A36E] pb-2">공연 시간</h2>
                <p className="py-2 text-md text-[#a9a59f]">{performance.dtguidance}</p>
            </div>
        )}
    </div>
</div>


            {/* 추가 이미지 */}
            {performance.styurls && performance.styurls.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-[#C0A36E] border-b border-[#C0A36E] pb-2">공연 이미지</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {performance.styurls.map((url, index) => (
                            <Image
                                key={index}
                                src={url}
                                alt={`공연 이미지 ${index + 1}`}
                                width={300}
                                height={200}
                                className="w-full object-cover"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 예매 링크 */}
            {performance.relates && performance.relates.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-[#C0A36E] border-b border-[#C0A36E] pb-2">예매 링크</h2>
                    <ul className="space-y-3 mt-4">
                        {performance.relates.map((relate, index) => (
                            <li key={index}>
                                <a
                                    href={relate.relateurl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#C0A36E] hover:underline"
                                >
                                    {relate.relatename ? `${relate.relatename} - ${relate.relateurl}` : relate.relateurl}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
