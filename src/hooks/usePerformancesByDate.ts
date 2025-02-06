import useSWR from "swr";
import { Performance } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePerformancesByDate(selectedDate: string) {
    const queryParams = new URLSearchParams({
        type: "pblprfr",
        stdate: selectedDate.replace(/-/g, ""),
        eddate: selectedDate.replace(/-/g, ""),
        cpage: "1",
        rows: "10",
    }).toString();

    const { data, error } = useSWR<Performance[]>(`/api/kopis?${queryParams}`, fetcher);

    return {
        performances: Array.isArray(data) ? data : [], // ✅ 배열이 아닐 경우 빈 배열 반환
        isLoading: !data && !error,
        isError: error,
    };
}
