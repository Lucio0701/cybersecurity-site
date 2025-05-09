import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = request.headers.get("Authorization") || "";

  console.log("POST /api/uploadFile - Dati inviati al backend:", {
    publication_id: formData.get("publication_id"),
    file: formData.get("file") ? "File presente" : "File mancante",
    token,
  });

  const response = await fetch("http://127.0.0.1:8000/uploadFile", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  // Controllo status della risposta prima di parsarla
  if (!response.ok) {
    const errorText = await response.text(); 
    console.error("POST /api/uploadFile - Errore dal backend:", errorText, "Status:", response.status);
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  const result = await response.json();
  console.log("POST /api/uploadFile - Risposta del backend:", result, "Status:", response.status);
  return NextResponse.json(result, { status: response.status });
}