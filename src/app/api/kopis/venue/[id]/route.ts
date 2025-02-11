import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

// variable: API 기본 설정 //
const BASE_URL = "http://kopis.or.kr/openApi/restful";
const SERVICE_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY;

// function: 공연장을 가져오기기 API //
export async function GET(
    _req: NextRequest,
    context: { params: { id: string } }
) {
    // variable: API 요청에 필요한 공연장 ID //
    const { id } = context.params;

    if (!id) {
        return NextResponse.json({ error: "Invalid venue ID" }, { status: 400 });
    }

    try {
        // variable: KOPIS API 요청 URL //
        const apiUrl = `${BASE_URL}/prfplc/${id}?service=${SERVICE_KEY}`;
        console.log("🔹 Fetching URL:", apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
            return NextResponse.json({ error: `KOPIS API Error: ${response.status}` }, { status: response.status });
        }

        // variable: XML 응답 데이터를 JSON으로 변환 //
        const xmlText = await response.text();
        const jsonData = await parseStringPromise(xmlText, { explicitArray: false });

        console.log("🔹 API Response Data:", jsonData);

        const venue = jsonData?.dbs?.db;
        if (!venue) {
            return NextResponse.json({ error: "No venue found" }, { status: 404 });
        }

        return NextResponse.json(venue);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error", message: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
