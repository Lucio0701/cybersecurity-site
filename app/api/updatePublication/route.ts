import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const token = request.headers.get("Authorization") || "";
  const { searchParams } = new URL(request.url);
  const publicationId = searchParams.get("id");

  if (!publicationId) {
    return NextResponse.json({ error: "ID della pubblicazione mancante" }, { status: 400 });
  }

  const body = await request.json();

  console.log("PUT /api/updatePublication - Dati inviati al backend:", {
    publication_id: publicationId,
    body,
    token,
  });

  const response = await fetch(`http://127.0.0.1:8000/publications/${publicationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("PUT /api/updatePublication - Errore dal backend:", errorText, "Status:", response.status);
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  const result = await response.json();
  console.log("PUT /api/updatePublication - Risposta del backend:", result, "Status:", response.status);
  return NextResponse.json(result, { status: response.status });
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}