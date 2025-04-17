import os
from fastapi import HTTPException, UploadFile

async def save_file(publication_id: int, file: UploadFile, conn):
    if not file.content_type.startswith("application/pdf"):
        raise HTTPException(status_code=400, detail="Il file deve essere un PDF")
    
    file_path = f"../../public/pdf/{file.filename}"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, "wb") as f:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Il file è vuoto")
        f.write(content)
    
    link = f"/pdf/{file.filename}"
    cursor = conn.cursor()
    cursor.execute("UPDATE publications SET link = ? WHERE id = ?", (link, publication_id))
    conn.commit()
    return link