import useSWR from "swr";
import { Performance } from "@/types";

// function: API 요청 함수 (fetcher) //
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// function: 특정 날짜의 공연 목록을 가져오는 SWR Hook //
export function usePerformancesByDate(selectedDate: string) {
    
    // variable: API 요청 쿼리 파라미터 //
    const queryParams = new URLSearchParams({
        type: "pblprfr",
        stdate: selectedDate.replace(/-/g, ""),
        eddate: selectedDate.replace(/-/g, ""),
        cpage: "1",
        rows: "10",
    }).toString();

    // API request: SWR을 활용한 공연 목록 데이터 요청 //
    const { data, error } = useSWR<Performance[]>(`/api/kopis?${queryParams}`, fetcher);

    // return: 공연 데이터 및 상태 반환 //
    return {
        performances: Array.isArray(data) ? data : [], // 배열이 아닐 경우 빈 배열 반환
        isLoading: !data && !error,
        isError: error,
    };
}
