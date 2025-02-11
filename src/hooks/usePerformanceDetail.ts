import useSWR from "swr";
import { PerformanceDetail } from "@/types";

// function: API 요청 함수 //
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// function: 특정 공연의 상세 정보를 가져오는 SWR Hook //
export function usePerformanceDetail(performanceId: string) {

    // API request: SWR을 활용한 공연 상세 정보 요청 //
    const { data, error } = useSWR<PerformanceDetail>(
        performanceId ? `/api/kopis/performance/${performanceId}` : null,
        fetcher
    );

    // return: 공연 상세 정보 및 상태 반환 //
    return {
        performance: data,
        isLoading: !data && !error,
        isError: error,
    };
}
