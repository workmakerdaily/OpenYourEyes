export interface Producer {
    mt30id: string; // 기획/제작사 ID
    entrpsnm: string; // 기획/제작사명
    prfnm: string; // 최신 작품 (선택적)
    genrenm?: string; // 장르 (선택적)
    telno?: string; // 전화번호 (선택적)
    relateurl?: string; // 홈페이지 URL (선택적)
}
