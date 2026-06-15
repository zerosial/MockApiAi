import { NextRequest, NextResponse } from "next/server";

interface Field {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

// 로컬 LLM 의존성을 제거하고 기본 필드를 반환합니다.
export async function POST(req: NextRequest) {
  try {
    // 입력 검증을 위해 본문은 그대로 파싱합니다(현재 기본 필드 생성에는 사용하지 않음).
    await req.json();

    const defaultFields = {
      requestFields: [
        {
          name: "id",
          type: "number",
          required: true,
          description: "사용자 ID",
        },
      ] as Field[],
      responseFields: [
        {
          name: "id",
          type: "number",
          required: true,
          description: "사용자 ID",
        },
        {
          name: "name",
          type: "string",
          required: true,
          description: "사용자 이름",
        },
        {
          name: "email",
          type: "email",
          required: true,
          description: "사용자 이메일",
        },
      ] as Field[],
    };

    return NextResponse.json(
      {
        success: true,
        fields: defaultFields,
        aiGenerated: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("필드 생성 오류:", error);
    return NextResponse.json(
      {
        success: false,
        error: "필드 생성 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
