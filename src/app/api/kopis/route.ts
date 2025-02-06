import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

const BASE_URL = "http://kopis.or.kr/openApi/restful";
const SERVICE_KEY = process.env.NEXT_PUBLIC_KOPIS_API_KEY; // 🔹 환경 변수 사용

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date") || ""; // 🔹 날짜 가져오기
        const type = searchParams.get("type") || "boxoffice"; // 🔹 기본값: boxoffice

        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
        }

        // ✅ API 요청 URL 설정
        let endpoint = `${BASE_URL}/${type}`;
        const queryParams = `?service=${SERVICE_KEY}&stdate=${date.replace(/-/g, "")}&eddate=${date.replace(/-/g, "")}&cpage=1&rows=10`;

        console.log("Fetching data from:", endpoint + queryParams); // 🔍 콘솔에서 확인

        const response = await fetch(endpoint + queryParams);
        if (!response.ok) throw new Error("Failed to fetch");

        const xmlText = await response.text();
        const jsonData = await parseStringPromise(xmlText, { explicitArray: false });

        const performances = jsonData?.dbs?.db || [];

        return NextResponse.json(performances);
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
