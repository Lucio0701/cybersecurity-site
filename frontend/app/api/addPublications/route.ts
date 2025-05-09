import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const token = request.headers.get("Authorization") || "";

  console.log("POST /api/addPublications - Dati inviati al backend:", data, "Token:", token);

  const response = await fetch("http://127.0.0.1:8000/addPublications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("POST /api/addPublications - Risposta del backend:", result, "Status:", response.status);
  return NextResponse.json(result, { status: response.status });
}