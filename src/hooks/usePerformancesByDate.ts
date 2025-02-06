import useSWR from "swr";
import { Performance } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePerformancesByDate(selectedDate: string) {
    const { data, error } = useSWR<Performance[]>(`/api/kopis?date=${selectedDate}&type=pblprfr`, fetcher);

    return {
        performances: data || [],
        isLoading: !data && !error,
        isError: error,
    };
}
