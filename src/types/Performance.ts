
// interface: 공연 타입 인터페이스 //
export interface Performance {
    mt20id: string;     // 공연 ID
    prfnm: string;      // 공연명
    prfpdfrom: string;  // 공연 시작일
    prfpdto: string;    // 공연 종료일
    fcltynm: string;    // 공연장 이름
    poster: string;     // 공연 포스터 URL
    area: string;       // 공연지역
    genrenm: string;    // 공연 장르명
    openrun: boolean;    // 오픈런
    prfstate: string;   // 공연상태
}