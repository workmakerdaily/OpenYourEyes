export interface PerformanceDetail {
    mt20id: string; // 공연 ID
    prfnm: string; // 공연명
    prfpdfrom: string; // 공연 시작일 (YYYY.MM.DD)
    prfpdto: string; // 공연 종료일 (YYYY.MM.DD)
    fcltynm: string; // 공연시설명 (공연장명)
    prfcast?: string; // 공연 출연진
    prfcrew?: string; // 공연 제작진
    prfruntime?: string; // 공연 런타임
    prfage?: string; // 공연 관람 연령
    entrpsnm?: string; // 기획제작사
    entrpsnmP?: string; // 제작사
    entrpsnmA?: string | null; // 기획사 (공백 가능)
    entrpsnmH?: string | null; // 주최 (공백 가능)
    entrpsnmS?: string | null; // 주관 (공백 가능)
    pcseguidance?: string; // 티켓 가격 정보
    poster?: string; // 포스터 이미지 URL
    sty?: string | null; // 줄거리 (공백 가능)
    area?: string; // 지역 (예: 서울특별시)
    genrenm?: string; // 공연 장르
    openrun?: "Y" | "N"; // 오픈런 여부
    visit?: "Y" | "N"; // 내한 여부
    child?: "Y" | "N"; // 아동 공연 여부
    daehakro?: "Y" | "N"; // 대학로 공연 여부
    festival?: "Y" | "N"; // 축제 여부
    musicallicense?: "Y" | "N"; // 뮤지컬 라이센스 여부
    musicalcreate?: "Y" | "N"; // 뮤지컬 창작 여부
    updatedate?: string; // 최종 수정일 (YYYY-MM-DD HH:MM:SS)
    prfstate?: string; // 공연 상태 (예: 공연중, 공연완료)
    styurls?: string[]; // 소개 이미지 목록 (여러 개일 경우 배열로 저장)
    mt10id?: string; // 공연시설 ID
    dtguidance?: string; // 공연 시간 안내
    relates?: {
        relatename?: string; // 예매처명 (일부 데이터에는 없음)
        relateurl: string; // 예매처 URL
    }[];
}
