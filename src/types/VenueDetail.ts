// interface: 공연시설 상세정보 타입 인터페이스 //
export interface VenueDetail {
    id: string; // 공연시설 ID
    fcltynm: string; // 공연시설명
    mt13cnt: number; // 공연장 수
    fcltychartr: string; // 시설특성
    opende: number; // 개관연도
    seatscale: number; // 객석 수
    telno: string | null; // 전화번호
    relateurl: string | null; // 홈페이지
    adres: string; // 주소
    la: number; // 위도
    lo: number; // 경도
    restaurant: boolean; // 레스토랑 여부
    cafe: boolean; // 카페 여부
    store: boolean; // 편의점 여부
    nolibang: boolean; // 놀이방 여부
    suyu: boolean; // 수유실 여부
    parkbarrier: boolean; // 장애시설 - 주차장 여부
    restbarrier: boolean; // 장애시설 - 화장실 여부
    runwbarrier: boolean; // 장애시설 - 경사로 여부
    elevbarrier: boolean; // 장애시설 - 엘리베이터 여부
    parkinglot: boolean; // 주차시설 여부
    mt13s: VenueStage[]; // 공연장 목록 (배열)
}
export interface VenueStage {
    prfplcnm: string; // 공연장명
    mt13id: string; // MT13_ID (고유식별 ID)
    seatscale: number; // 좌석 규모
    stageorchat: boolean; // 무대시설_오케스트라피트
    stagepracat: boolean; // 무대시설_연습실
    stagedresat: boolean; // 무대시설_분장실
    stageoutdrat: boolean; // 무대시설_야외공연장
    disabledseatscale: number; // 장애인 관객석 수
    stagearea: string; // 무대 넓이
}
