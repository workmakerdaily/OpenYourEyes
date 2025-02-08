import Image from "next/image";

interface PerformanceCardProps {
    performance: {
        mt20id: string;
        prfnm: string;
        poster: string;
        prfpdfrom: string;
        prfpdto: string;
        fcltynm: string;
    };
}

export default function PerformanceCard({ performance }: PerformanceCardProps) {
    return (
        <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg">
            <Image
                src={performance.poster || "/default-poster.jpg"}
                alt={performance.prfnm}
                width={300}
                height={400}
                className="w-full h-60 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{performance.prfnm}</h2>
                <p className="text-sm text-gray-400">{performance.fcltynm}</p>
                <p className="text-xs text-gray-500">
                    {performance.prfpdfrom} ~ {performance.prfpdto}
                </p>
            </div>
        </div>
    );
}
