'''from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import sqlite3
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from exporters import PublicationExporter, JSONExporter, CSVExporter, PDFExporter

app = FastAPI()'''

from fastapi import FastAPI
from backend.auth.routes import router as auth_router
from backend.publications.routes import router as publications_router
from backend.database.connection import init_db

app = FastAPI()

# Inizializzazione del database
app.on_event("startup")(init_db)

# Registrazione dei router
app.include_router(auth_router)
app.include_router(publications_router)


'''
# Configurazione JWT
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configurazione hash password
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Modelli Pydantic
class User(BaseModel):
    username: str
    role: str

class UserInDB(User):
    hashed_password: str

class PublicationCreate(BaseModel):
    title: str
    authors: str
    year: int
    category: str
    abstract: str

class Publication(BaseModel):
    id: int
    title: str
    authors: str
    year: int
    category: str
    abstract: str
    link: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Connessione al database
def get_db():
    conn = sqlite3.connect("../database.db")  # Relativo a backend/src/
    conn.row_factory = sqlite3.Row
    return conn

# Inizializzazione del database
@app.on_event("startup")
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    # Tabella utenti
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            hashed_password TEXT,
            role TEXT
        )
    """)
    # Tabella pubblicazioni
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS publications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            authors TEXT,
            year INTEGER,
            category TEXT,
            abstract TEXT,
            link TEXT
        )
    """)
    # Utente admin di esempio
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        hashed_password = pwd_context.hash("admin123")
        cursor.execute("INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)",
                       ("admin", hashed_password, "admin"))
    # Pubblicazioni di esempio
    cursor.execute("SELECT COUNT(*) FROM publications")
    if cursor.fetchone()[0] == 0:
        cursor.executemany("""
            INSERT INTO publications (title, authors, year, category, abstract, link)
            VALUES (?, ?, ?, ?, ?, ?)
        """, [
            ("Analisi Avanzata dei Malware Moderni", "Mario Rossi, Laura Bianchi", 2023, "Malware",
             "Uno studio approfondito sulle tecniche di reverse engineering.", "/pdf/malware-2023.pdf"),
            ("Sicurezza delle Infrastrutture Critiche", "Anna Verdi, Marco Neri", 2022, "Pentesting",
             "Un’analisi dei metodi di pentesting.", "/pdf/infrastrutture-2022.pdf"),
        ])
    conn.commit()
    conn.close()

# Funzioni di autenticazione
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(username: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT username, hashed_password, role FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    conn.close()
    if user:
        return UserInDB(username=user[0], hashed_password=user[1], role=user[2])
    return None

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token non valido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token non valido")
    user = get_user(username)
    if user is None:
        raise HTTPException(status_code=401, detail="Utente non trovato")
    return user

async def get_current_admin(user: User = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Accesso negato: richiesto ruolo admin")
    return user

# Endpoint di login
@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenziali non valide")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token({"sub": user.username, "role": user.role}, access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint pubblico per ottenere le pubblicazioni
@app.get("/publications", response_model=list[Publication])
async def get_publications():
    print("ciao2")
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, authors, year, category, abstract, link FROM publications")
    rows = cursor.fetchall()
    conn.close()
    return [Publication(id=row[0], title=row[1], authors=row[2], year=row[3], category=row[4],
                       abstract=row[5], link=row[6]) for row in rows]

# Endpoint protetto per aggiungere una pubblicazione (solo dati testuali)
@app.post("/addPublications", response_model=dict)
async def add_publication(
    publication: PublicationCreate,
    user: User = Depends(get_current_admin)
):
    conn = get_db()
    cursor = conn.cursor()
    # Inserisci la pubblicazione con un link temporaneamente vuoto
    cursor.execute(
        "INSERT INTO publications (title, authors, year, category, abstract, link) VALUES (?, ?, ?, ?, ?, ?)",
        (publication.title, publication.authors, publication.year, publication.category, publication.abstract, "")
    )
    # Ottieni l'ID della pubblicazione appena creata
    publication_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"message": "Dati testuali salvati", "publication_id": publication_id}

# Endpoint protetto per caricare il file PDF e aggiornare il link
@app.post("/uploadFile", response_model=dict)
async def upload_file(
    publication_id: int = Form(...),
    file: UploadFile = File(...),
    user: User = Depends(get_current_admin)
):
    try:
        # Verifica che il file sia un PDF
        if not file.content_type.startswith("application/pdf"):
            raise HTTPException(status_code=400, detail="Il file deve essere un PDF")

        # Crea il percorso per salvare il file
        file_path = f"../../public/pdf/{file.filename}"
        # Crea la directory se non esiste
        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        # Salva il file
        with open(file_path, "wb") as f:
            content = await file.read()
            if not content:
                raise HTTPException(status_code=400, detail="Il file è vuoto")
            f.write(content)

        # Crea il link per il file
        link = f"/pdf/{file.filename}"

        # Aggiorna il link nel database
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM publications WHERE id = ?", (publication_id,))
        if not cursor.fetchone():
            conn.close()
            raise HTTPException(status_code=404, detail="Pubblicazione non trovata")
        cursor.execute("UPDATE publications SET link = ? WHERE id = ?", (link, publication_id))
        conn.commit()
        conn.close()

        return {"message": "File caricato e pubblicazione aggiornata"}
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Errore in upload_file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Errore durante il caricamento del file: {str(e)}")
    

    # Nuovo endpoint per eliminare una pubblicazione
@app.delete("/publications/{publication_id}", response_model=dict)
async def delete_publication(publication_id: int, user: User = Depends(get_current_admin)):
    try:
        conn = get_db()
        cursor = conn.cursor()

        # Verifica che la pubblicazione esista
        cursor.execute("SELECT link FROM publications WHERE id = ?", (publication_id,))
        publication = cursor.fetchone()
        if not publication:
            conn.close()
            raise HTTPException(status_code=404, detail="Pubblicazione non trovata")

        # Elimina il file PDF associato, se esiste
        link = publication["link"]
        if link:
            file_path = f"../../public{link}"  # Es. ../../public/pdf/nomefile.pdf
            if os.path.exists(file_path):
                os.remove(file_path)

        # Elimina la pubblicazione dal database
        cursor.execute("DELETE FROM publications WHERE id = ?", (publication_id,))
        conn.commit()
        conn.close()

        return {"message": "Pubblicazione eliminata con successo"}
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Errore in delete_publication: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Errore durante l'eliminazione della pubblicazione: {str(e)}")
    
# Nuovo endpoint per esportare le pubblicazioni
@app.get("/export", response_class=StreamingResponse)
async def export_publications(format: str = "json", user: User = Depends(get_current_admin)):
    try:
        # Recupera le pubblicazioni
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

        # Seleziona l'implementazione in base al formato
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

        # Esporta i dati
        data = exporter.export(publications)

        # Restituisci il file come streaming response
        return StreamingResponse(
            iter([data]),
            media_type=content_type,
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Errore in export_publications: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Errore durante l'esportazione: {str(e)}")
    
# Nuovo endpoint per aggiornare una pubblicazione
@app.put("/publications/{publication_id}", response_model=dict)
async def update_publication(
    publication_id: int,
    publication: PublicationCreate,
    user: User = Depends(get_current_admin)
):
    try:
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
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Errore in update_publication: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Errore durante l'aggiornamento della pubblicazione: {str(e)}")

# Nuovo endpoint per aggiornare il file PDF di una pubblicazione
@app.put("/publications/{publication_id}/file", response_model=dict)
async def update_publication_file(
    publication_id: int,
    file: UploadFile = File(...),
    user: User = Depends(get_current_admin)
):
    try:
        if not file.content_type.startswith("application/pdf"):
            raise HTTPException(status_code=400, detail="Il file deve essere un PDF")

        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT link FROM publications WHERE id = ?", (publication_id,))
        publication = cursor.fetchone()
        if not publication:
            conn.close()
            raise HTTPException(status_code=404, detail="Pubblicazione non trovata")

        # Elimina il vecchio file PDF, se esiste
        old_link = publication["link"]
        if old_link:
            old_file_path = f"../../public{old_link}"
            if os.path.exists(old_file_path):
                os.remove(old_file_path)

        # Salva il nuovo file
        new_file_path = f"../../public/pdf/{file.filename}"
        os.makedirs(os.path.dirname(new_file_path), exist_ok=True)
        with open(new_file_path, "wb") as f:
            content = await file.read()
            if not content:
                raise HTTPException(status_code=400, detail="Il file è vuoto")
            f.write(content)

        # Aggiorna il link nel database
        new_link = f"/pdf/{file.filename}"
        cursor.execute("UPDATE publications SET link = ? WHERE id = ?", (new_link, publication_id))
        conn.commit()
        conn.close()

        return {"message": "File PDF aggiornato con successo"}
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Errore in update_publication_file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Errore durante l'aggiornamento del file: {str(e)}")'''