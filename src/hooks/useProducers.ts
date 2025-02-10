import useSWR from "swr";
import { Producer } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProducers() {
    const queryParams = new URLSearchParams({
        type: "mnfct", // ✅ 제작사 목록 요청
        cpage: "1", // 기본 페이지 1
        rows: "10", // 기본 10개씩 불러오기
    }).toString();

    const { data, error } = useSWR<Producer[]>(`/api/kopis?${queryParams}`, fetcher);

    return {
        producers: Array.isArray(data) ? data : [],
        isLoading: !data && !error,
        isError: error,
    };
}
