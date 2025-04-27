# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Copia i requirements e installa
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il codice FastAPI
COPY . .

# Avvia con Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
