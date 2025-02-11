import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

// variable: API 기본 설정 //
const BASE_URL = "http://kopis.or.kr/openApi/restful";
const SERVICE_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY;

// function: 공연 데이터를 조회하는 API //
export async function GET(req: Request) {
    try {
        // variable: 요청된 URL의 검색 파라미터 //
        const { searchParams } = new URL(req.url);
        const query = searchParams.toString();
        const type = searchParams.get("type");

        // variable: KOPIS API 요청 URL //
        const apiUrl = `${BASE_URL}/${type}?service=${SERVICE_KEY}&${query}`;

        // API 요청 실행
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return NextResponse.json({ error: `KOPIS API Error: ${response.status}` }, { status: 500 });
        }

        // variable: XML 응답 데이터를 JSON으로 변환 //
        const xmlText = await response.text();
        // XML → JSON 변환
        const jsonData = await parseStringPromise(xmlText, { explicitArray: false });

        // variable: API 응답 데이터에서 공연 목록 추출 //
        let performances = jsonData?.boxofs?.boxof || jsonData?.dbs?.db || [];

        // API 응답이 단일 객체일 경우 배열로 변환
        if (!Array.isArray(performances)) {
            performances = [performances];
        }

        return NextResponse.json(performances);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
