import useSWR from "swr";
import { TopPerformance } from "@/types";

// function: 날짜를 YYYYMMDD 형식으로 변환하는 함수 //
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
};

// function: 한국 시간 기준으로 이번 달의 첫 날과 마지막 날을 반환하는 함수 //
const getKoreanMonthRange = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const year = now.getFullYear();

    // variable: 이번 달의 첫날과 마지막 날 //
    const firstDayOfMonth = new Date(year, currentMonth, 1);
    const stdate = formatDate(firstDayOfMonth);

    const lastDayOfMonth = new Date(year, currentMonth + 1, 0);
    const eddate = formatDate(lastDayOfMonth);

    return { stdate, eddate };
};

// function: API 요청 함수 //
const fetcher = async (url: string): Promise<TopPerformance[]> => {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`API 요청 실패: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        return [];
    }
};

// function: BoxOffice 데이터를 가져오는 SWR Hook //
export function useBoxOfficeByDate() { // selectedDate 제거

    // variable: 이번 달의 시작일과 종료일 //
    const { stdate, eddate } = getKoreanMonthRange();
    
    // variable: API 요청 쿼리 파라미터 //
    const queryParams = new URLSearchParams({
        type: "boxoffice",
        stdate,
        eddate
    }).toString();

    // API request: SWR을 활용한 데이터 요청 //
    const { data, error } = useSWR<TopPerformance[]>(`/api/kopis?${queryParams}`, fetcher);

    console.log("BoxOffice API 응답 데이터:", data);

    // return: BoxOffice 데이터 및 로딩 상태 반환 //
    return {
        boxOffice: Array.isArray(data) ? data : [], // 데이터가 배열이 아닐 경우 빈 배열 반환
        isLoading: !data && !error,
        isError: !!error, // 오류 상태를 명확하게 반환
    };
}
