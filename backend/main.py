from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import sqlite3
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

app = FastAPI()

# Configurazione JWT
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configurazione hash password
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Modelli
class User(BaseModel):
    username: str
    role: str

class UserInDB(User):
    hashed_password: str

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
    conn = sqlite3.connect("publications.db")
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
    return {"access_token":  access_token, "token_type": "bearer"}

# Endpoint pubblico per ottenere le pubblicazioni
@app.get("/publications", response_model=list[Publication])
async def get_publications():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, authors, year, category, abstract, link FROM publications")
    rows = cursor.fetchall()
    conn.close()
    return [Publication(id=row[0], title=row[1], authors=row[2], year=row[3], category=row[4],
                       abstract=row[5], link=row[6]) for row in rows]

# Endpoint protetto per caricare pubblicazioni (solo admin)
@app.post("/publications", response_model=dict)
async def add_publication(
    title: str = Form(...),
    authors: str = Form(...),
    year: int = Form(...),
    category: str = Form(...),
    abstract: str = Form(...),
    file: UploadFile = File(...),
    user: User = Depends(get_current_admin)
):
    conn = get_db()
    cursor = conn.cursor()
    link = f"/pdf/{file.filename}"
    cursor.execute("INSERT INTO publications (title, authors, year, category, abstract, link) VALUES (?, ?, ?, ?, ?, ?)",
                   (title, authors, year, category, abstract, link))
    conn.commit()
    conn.close()
    # Salva il file nella directory public/pdf del frontend
    with open(f"../public/pdf/{file.filename}", "wb") as f:
        f.write(await file.read())
    return {"message": "Pubblicazione aggiunta"}