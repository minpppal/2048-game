import fs from "fs";
import path from "path";

// 현재 작업 디렉터리에서 "ranking.json" 파일의 경로를 생성
const filePath = path.join(process.cwd(), "public", "rankingData.json");

// GET 요청 핸들러
export async function GET() {
  // ranking.json 파일을 읽어서 문자열로 가져옵니다.
  const data = fs.readFileSync(filePath, "utf-8");
  // 읽어온 데이터를 클라이언트에게 JSON 형식으로 응답
  return new Response(data, {
    status: 200,
    headers: { "Content-Type": "application/json" }, // 응답 헤더 설정 (JSON 데이터임을 명시)
  });
}

// POST 요청 핸들러
export async function POST(req: Request) {
  // 요청 본문에서 JSON 데이터를 파싱하여 'rank' 값을 추출
  const { name, score } = await req.json();
  // 'rank'가 숫자가 아닌 경우, 잘못된 요청 처리
  if (typeof name !== "string" || typeof score !== "number") {
    return new Response(JSON.stringify({ error: "Invalid rank" }), {
      status: 400,
    });
  }
  // ranking.json 파일을 읽어서 기존 점수 목록을 가져옵니다.
  const ranks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  ranks.push({ name, score });
  // 갱신된 점수 목록을 ranking.json 파일에 저장
  const updatedRanks = ranks
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 10);

  // 갱신된 데이터를 ranking.json 파일에 저장
  fs.writeFileSync(filePath, JSON.stringify(updatedRanks, null, 2));
  // 갱신된 상위 10개 점수를 클라이언트에게 JSON 형식으로 응답
  return new Response(JSON.stringify(updatedRanks), { status: 200 });
}
