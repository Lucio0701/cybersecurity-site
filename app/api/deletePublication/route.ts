import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const token = request.headers.get("Authorization") || "";
  // Estrai l'ID dai query parameter
  const url = new URL(request.url);
  const publicationId = url.searchParams.get("id");

  if (!publicationId) {
    return NextResponse.json({ error: "ID della pubblicazione mancante" }, { status: 400 });
  }

  console.log("DELETE /api/deletePublication - Dati inviati al backend:", {
    publication_id: publicationId,
    token,
  });

  const response = await fetch(`http://127.0.0.1:8000/publications/${publicationId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("DELETE /api/deletePublication - Errore dal backend:", errorText, "Status:", response.status);
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  const result = await response.json();
  console.log("DELETE /api/deletePublication - Risposta del backend:", result, "Status:", response.status);
  return NextResponse.json(result, { status: response.status });
}

// Handler per gestire richieste GET (non consentite)
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}