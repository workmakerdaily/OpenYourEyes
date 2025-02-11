import Image from "next/image";
import Link from "next/link";

// interface: PerformanceCardProps 인터페이스 //
interface PerformanceCardProps {
    performance: {
        mt20id: string;
        prfnm: string;
        poster: string;
        prfpdfrom: string;
        prfpdto: string;
        fcltynm: string;
        prfstate: string;
    };
}

// component: 공연 카드  //
const PerformanceCard = ({ performance }: PerformanceCardProps) => {

    // render: 공연 카드 렌더링 //
    return (
        <Link href={`/performance/${performance.mt20id}`}>
        <div className="text-white overflow-hidden shadow-lg flex flex-row w-full border border-[#a9a59f]">
            {/* 포스터 (왼쪽) */}
            <div className="w-[150px] h-[200px] flex-shrink-0 p-2">
                <Image
                    src={performance.poster}
                    alt={performance.prfnm}
                    width={150} // 크기 고정
                    height={200} // 크기 고정
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 정보 (오른쪽) */}
            <div className="p-2 flex flex-col justify-center">
                <h2 className="text-base font-semibold">{performance.prfnm}</h2>
                <p className="text-sm text-gray-400">{performance.fcltynm}</p>
                <p className="text-xs text-gray-500">
                    {performance.prfpdfrom} ~ {performance.prfpdto}
                </p>
                <p className={`text-xs font-bold mt-2 
                    ${performance.prfstate === "공연예정" ? "text-[#a9a59f]" : ""}
                    ${performance.prfstate === "공연중" ? "text-[#F8F5F0]" : ""}
                    ${performance.prfstate === "공연완료" ? "text-[#888580]" : ""}
                `}>
                    {performance.prfstate}
                </p>
            </div>
        </div>
        </Link>
    );
}

export default PerformanceCard;