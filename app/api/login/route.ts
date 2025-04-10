import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text(); // Legge il corpo come stringa URL-encoded
  const response = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body,
  });
  const data = await response.json();
  console.log(data)
  return NextResponse.json(data, { status: response.status });
}