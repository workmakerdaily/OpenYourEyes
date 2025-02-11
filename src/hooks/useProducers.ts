import useSWR from "swr";
import { Producer } from "@/types";

// function: API 요청 함수 (fetcher) //
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// function: 제작사 목록을 가져오는 SWR Hook //
export function useProducers() {

    // variable: API 요청 쿼리 파라미터 //
    const queryParams = new URLSearchParams({
        type: "mnfct", // 제작사 목록 요청
        cpage: "1", // 기본 페이지 1
        rows: "10", // 기본 10개씩 불러오기
    }).toString();

    // API request: SWR을 활용한 제작사 목록 데이터 요청 //
    const { data, error } = useSWR<Producer[]>(`/api/kopis?${queryParams}`, fetcher);

    // return: 제작사 데이터 및 상태 반환 //
    return {
        producers: Array.isArray(data) ? data : [],
        isLoading: !data && !error,
        isError: error,
    };
}
