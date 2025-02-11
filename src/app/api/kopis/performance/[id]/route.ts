import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

// ✅ Next.js 15에서 API Route의 params 타입을 명확히 선언
export interface RouteContext {
    params: { id: string };
}

const BASE_URL = "http://kopis.or.kr/openApi/restful";
const SERVICE_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY; // 환경 변수에서 API 키 가져오기

export async function GET(
    req: NextRequest,
    context: RouteContext // ✅ Next.js의 기대 타입과 일치하도록 지정
) {
    const { id } = context.params;

    if (!id) {
        return NextResponse.json({ error: "Invalid performance ID" }, { status: 400 });
    }

    try {
        const apiUrl = `${BASE_URL}/pblprfr/${id}?service=${SERVICE_KEY}`;
        console.log("🔹 Fetching URL:", apiUrl); // ✅ API 요청 URL 확인

        const response = await fetch(apiUrl);
        if (!response.ok) {
            return NextResponse.json({ error: `KOPIS API Error: ${response.status}` }, { status: response.status });
        }

        const xmlText = await response.text();
        const jsonData = await parseStringPromise(xmlText, { explicitArray: false });

        console.log("🔹 API Response Data:", jsonData); // ✅ API 응답 확인

        const performance = jsonData?.dbs?.db;
        if (!performance) {
            return NextResponse.json({ error: "No performance found" }, { status: 404 });
        }

        return NextResponse.json(performance);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error", message: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
