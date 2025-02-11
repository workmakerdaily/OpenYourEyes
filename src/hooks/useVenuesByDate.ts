import useSWRInfinite from "swr/infinite";
import { Venue } from "@/types";

// function: API 요청 함수 (fetcher) //
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// function: 공연장 목록을 무한 스크롤 방식으로 가져오는 SWR Hook //
export function useVenuesByDate(searchTerm: string) {

    // function: SWR Infinite Key 설정 (페이지네이션 적용) //
    const getKey = (pageIndex: number, previousPageData: Venue[]) => {
        if (previousPageData && previousPageData.length === 0) return null; // 더 이상 데이터 없음

        // variable: API 요청 쿼리 파라미터 //
        const queryParams = new URLSearchParams({
            type: "prfplc", // 공연시설 API
            cpage: (pageIndex + 1).toString(), // 페이지 번호
            rows: "10", // 페이지당 데이터 수
            shprfnmfct: searchTerm,
        }).toString();

        return `/api/kopis?${queryParams}`;
    };

    // API request: SWR을 활용한 공연장 목록 데이터 요청 //
    const { data, size, setSize, isLoading, isValidating, error } = useSWRInfinite(getKey, fetcher);

    // variable: 불러온 공연장 데이터를 펼쳐서(flat) 하나의 배열로 저장 //
    const venues = data ? data.flat() : [];

    // return: 공연장 데이터 및 상태 반환 //
    return {
        venues,
        isLoading,
        isError: error,
        isValidating,
        loadMore: () => setSize(size + 1),
    };
}
