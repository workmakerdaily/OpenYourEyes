// interface: 공연시설 타입 인터페이스 //
export interface Venue {
    mt10id: string;        // 공연시설 ID
    fcltynm: string;       // 공연시설명
    mt13cnt: number;       // 공연장 수
    fcltychartr: string;   // 시설 특성 (문예회관, 공연장 등)
    sidonm: string;        // 지역 (시/도)
    gugunnm: string;       // 지역 (구/군)
    opende: string;        // 개관 연도 (YYYY)
}