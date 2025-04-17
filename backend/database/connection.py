import sqlite3
from fastapi import FastAPI
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_db():
    conn = sqlite3.connect("../database.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            hashed_password TEXT,
            role TEXT
        )
    """)
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
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        hashed_password = pwd_context.hash("admin123")
        cursor.execute("INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)",
                       ("admin", hashed_password, "admin"))
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