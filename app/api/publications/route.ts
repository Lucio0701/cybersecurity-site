import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization") || "";
  const response = await fetch("http://127.0.0.1:8000/publications", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const originalData = await request.formData();
  const formData = new FormData();

  for (const [key, value] of originalData.entries()) {
    formData.append(key, value);
  }

  const token = request.headers.get("Authorization") || "";
  console.log(token);
  for (const [key, value] of originalData.entries()) {
    console.log(key, value);
  }

  const response = await fetch("http://127.0.0.1:8000/publications", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: originalData,
  });

  const result = await response.json();
  return NextResponse.json(result, { status: response.status });
}
