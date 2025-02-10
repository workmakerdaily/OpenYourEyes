import useSWR from "swr";
import { PerformanceDetail } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePerformanceDetail(performanceId: string) {
    const { data, error } = useSWR<PerformanceDetail>(
        performanceId ? `/api/kopis/detail/${performanceId}` : null,
        fetcher
    );

    return {
        performance: data,
        isLoading: !data && !error,
        isError: error,
    };
}
