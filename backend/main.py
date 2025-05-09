
from fastapi import FastAPI
from auth.routes import router as auth_router
from publications.routes import router as publications_router
from database.connection import init_db

app = FastAPI()

# Inizializzazione del database
app.on_event("startup")(init_db)

# Registrazione dei router
app.include_router(auth_router)
app.include_router(publications_router)