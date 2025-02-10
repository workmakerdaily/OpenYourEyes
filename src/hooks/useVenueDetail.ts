import useSWR from "swr";
import { VenueDetail } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useVenueDetail(venueId: string) {
    console.log("🔹 Fetching Venue Detail for ID:", venueId); // ✅ 콘솔 확인 추가

    const { data, error } = useSWR<VenueDetail>(
        venueId ? `/api/kopis/venue/${venueId}` : null, 
        fetcher
    );

    return {
        venue: data,
        isLoading: !data && !error,
        isError: error,
    };
}
