import useSWR from "swr";
import { TopPerformance } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBoxOfficeByDate(selectedDate: string) {
    const { data, error } = useSWR<TopPerformance[]>(`/api/kopis?date=${selectedDate}&type=boxoffice`, fetcher);

    console.log("📢 BoxOffice API 응답 데이터:", data); // ✅ API 응답 확인

    return {
        boxOffice: data || [],
        isLoading: !data && !error,
        isError: error,
    };
}
