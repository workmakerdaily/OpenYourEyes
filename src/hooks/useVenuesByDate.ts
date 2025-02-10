import useSWRInfinite from "swr/infinite";
import { Venue } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useVenuesByDate(searchTerm: string) {
    const getKey = (pageIndex: number, previousPageData: Venue[]) => {
        if (previousPageData && previousPageData.length === 0) return null; // 더 이상 데이터 없음

        const queryParams = new URLSearchParams({
            type: "prfplc", // 공연시설 API
            cpage: (pageIndex + 1).toString(), // 페이지 번호
            rows: "10", // 페이지당 데이터 수
            shprfnmfct: searchTerm,
        }).toString();

        return `/api/kopis?${queryParams}`;
    };

    const { data, size, setSize, isLoading, isValidating, error } = useSWRInfinite(getKey, fetcher);

    const venues = data ? data.flat() : [];

    return {
        venues,
        isLoading,
        isError: error,
        isValidating,
        loadMore: () => setSize(size + 1),
    };
}
