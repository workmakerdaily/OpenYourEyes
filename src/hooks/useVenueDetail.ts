import useSWR from "swr";
import { VenueDetail } from "@/types";

// function: API 요청 함수 (fetcher) //
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// function: 특정 공연장의 상세 정보를 가져오는 SWR Hook //
export function useVenueDetail(venueId: string) {
    console.log("🔹 Fetching Venue Detail for ID:", venueId); // 콘솔 확인 추가

    // API request: SWR을 활용한 공연장 상세 정보 요청 //
    const { data, error } = useSWR<VenueDetail>(
        venueId ? `/api/kopis/venue/${venueId}` : null, 
        fetcher
    );

    // return: 공연장 상세 데이터 및 상태 반환 //
    return {
        venue: data,
        isLoading: !data && !error,
        isError: error,
    };
}
