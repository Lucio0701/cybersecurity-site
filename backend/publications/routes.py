from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from typing import List
import sqlite3
import os
from database.connection import get_db
from auth.utils import get_current_admin, UserInDB, User
from exporters import PublicationExporter, JSONExporter, CSVExporter, PDFExporter
from publications.models import Publication, PublicationCreate
from publications.utils import save_file

router = APIRouter (tags=["publications"])

@router.get("/publications", response_model=List[Publication])
async def get_publications():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, authors, year, category, abstract, link FROM publications")
    rows = cursor.fetchall()
    conn.close()
    return [Publication(id=row[0], title=row[1], authors=row[2], year=row[3], category=row[4],
                       abstract=row[5], link=row[6]) for row in rows]

@router.post("/addPublications", response_model=dict)
async def add_publication(publication: PublicationCreate, user: UserInDB = Depends(get_current_admin)):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO publications (title, authors, year, category, abstract, link) VALUES (?, ?, ?, ?, ?, ?)",
        (publication.title, publication.authors, publication.year, publication.category, publication.abstract, "")
    )
    publication_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"message": "Dati testuali salvati", "publication_id": publication_id}

@router.post("/uploadFile", response_model=dict)
async def upload_file(
    publication_id: int = Form(...),
    file: UploadFile = File(...),
    user: UserInDB = Depends(get_current_admin)
):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM publications WHERE id = ?", (publication_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Pubblicazione non trovata")
    
    await save_file(publication_id, file, conn)
    conn.close()
    return {"message": "File caricato e pubblicazione aggiornata"}

@router.delete("/publications/{publication_id}", response_model=dict)
async def delete_publication(publication_id: int, user: UserInDB = Depends(get_current_admin)):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT link FROM publications WHERE id = ?", (publication_id,))
    publication = cursor.fetchone()
    if not publication:
        conn.close()
        raise HTTPException(status_code=404, detail="Pubblicazione non trovata")
    
    link = publication["link"]
    if link:
        file_path = f"../../public{link}"
        if os.path.exists(file_path):
            os.remove(file_path)
    
    cursor.execute("DELETE FROM publications WHERE id = ?", (publication_id,))
    conn.commit()
    conn.close()
    return {"message": "Pubblicazione eliminata con successo"}

@router.get("/export", response_class=StreamingResponse)
async def export_publications(format: str = "json", user: UserInDB = Depends(get_current_admin)):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, authors, year, category, abstract, link FROM publications")
    rows = cursor.fetchall()
    conn.close()
    publications = [
        {
            "id": row["id"],
            "title": row["title"],
            "authors": row["authors"],
            "year": row["year"],
            "category": row["category"],
            "abstract": row["abstract"],
            "link": row["link"],
        }
        for row in rows
    ]
    
    if format.lower() == "json":
        exporter = PublicationExporter(JSONExporter())
        content_type = "application/json"
        filename = "publications.json"
    elif format.lower() == "csv":
        exporter = PublicationExporter(CSVExporter())
        content_type = "text/csv"
        filename = "publications.csv"
    elif format.lower() == "pdf":
        exporter = PublicationExporter(PDFExporter())
        content_type = "application/pdf"
        filename = "publications.pdf"
    else:
        raise HTTPException(status_code=400, detail="Formato non supportato. Usa 'json', 'csv' o 'pdf'.")
    
    data = exporter.export(publications)
    return StreamingResponse(
        iter([data]),
        media_type=content_type,
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@router.put("/publications/{publication_id}", response_model=dict)
async def update_publication(
    publication_id: int,
    publication: PublicationCreate,
    user: UserInDB = Depends(get_current_admin)
):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM publications WHERE id = ?", (publication_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Pubblicazione non trovata")
    cursor.execute(
        "UPDATE publications SET title = ?, authors = ?, year = ?, category = ?, abstract = ? WHERE id = ?",
        (publication.title, publication.authors, publication.year, publication.category, publication.abstract, publication_id)
    )
    conn.commit()
    conn.close()
    return {"message": "Pubblicazione aggiornata con successo"}

@router.put("/publications/{publication_id}/file", response_model=dict)
async def update_publication_file(
    publication_id: int,
    file: UploadFile = File(...),
    user: UserInDB = Depends(get_current_admin)
):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT link FROM publications WHERE id = ?", (publication_id,))
    publication = cursor.fetchone()
    if not publication:
        conn.close()
        raise HTTPException(status_code=404, detail="Pubblicazione non trovata")
    
    old_link = publication["link"]
    if old_link:
        old_file_path = f"../../public{old_link}"
        if os.path.exists(old_file_path):
            os.remove(old_file_path)
    
    await save_file(publication_id, file, conn)
    conn.close()
    return {"message": "File PDF aggiornato con successo"}