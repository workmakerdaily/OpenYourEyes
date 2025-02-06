import useSWR from "swr";
import { TopPerformance } from "@/types";

// 날짜를 YYYYMMDD 형식으로 변환하는 함수
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
};

// 한국 시간 기준으로 이번 달의 첫 날과 마지막 날을 반환하는 함수
const getKoreanMonthRange = () => {
    const now = new Date();
    const currentMonth = now.getMonth(); // 현재 월
    const year = now.getFullYear();

    // 이번 달의 첫 날
    const firstDayOfMonth = new Date(year, currentMonth, 1);
    const stdate = formatDate(firstDayOfMonth);

    // 이번 달의 마지막 날
    const lastDayOfMonth = new Date(year, currentMonth + 1, 0);
    const eddate = formatDate(lastDayOfMonth);

    return { stdate, eddate };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBoxOfficeByDate(selectedDate: string) {

    const { stdate, eddate } = getKoreanMonthRange();
    
    const queryParams = new URLSearchParams({
        type: "boxoffice",
        stdate,
        eddate
    }).toString();

    const { data, error } = useSWR<TopPerformance[]>(`/api/kopis?${queryParams}`, fetcher);

    console.log("BoxOffice API 응답 데이터:", data);

    return {
        boxOffice: Array.isArray(data) ? data : [],
        isLoading: !data && !error,
        isError: error,
    };
}
