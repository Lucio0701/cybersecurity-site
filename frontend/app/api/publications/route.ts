import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization") || "";
  const response = await fetch("http://backend:8000/publications", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}