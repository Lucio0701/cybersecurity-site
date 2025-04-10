import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization") || "";
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "json";

  console.log("GET /api/export - Dati inviati al backend:", {
    format,
    token,
  });

  const response = await fetch(`http://127.0.0.1:8000/export?format=${format}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("GET /api/export - Errore dal backend:", errorText, "Status:", response.status);
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  // Passa attraverso gli header e il corpo della risposta
  const contentType = response.headers.get("Content-Type") || "application/octet-stream";
  const contentDisposition = response.headers.get("Content-Disposition") || "attachment; filename=publications";
  const buffer = await response.arrayBuffer();

  return new NextResponse(buffer, {
    status: response.status,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition,
    },
  });
}