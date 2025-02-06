import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

const BASE_URL = "http://kopis.or.kr/openApi/restful";
const SERVICE_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY; // ✅ 환경 변수에서 API 키 가져오기

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.toString();
        const type = searchParams.get("type");

        // ✅ API 요청 URL
        const apiUrl = `${BASE_URL}/${type}?service=${SERVICE_KEY}&${query}`;

        // ✅ API 요청 실행
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return NextResponse.json({ error: `KOPIS API Error: ${response.status}` }, { status: 500 });
        }

        // ✅ API 응답 확인
        const xmlText = await response.text();

        // ✅ XML → JSON 변환
        const jsonData = await parseStringPromise(xmlText, { explicitArray: false });

        // ✅ API 응답에서 `boxofs.boxof` 또는 `dbs.db` 추출
        let performances = jsonData?.boxofs?.boxof || jsonData?.dbs?.db || [];

        // ✅ API 응답이 단일 객체일 경우 배열로 변환
        if (!Array.isArray(performances)) {
            performances = [performances];
        }

        return NextResponse.json(performances);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
