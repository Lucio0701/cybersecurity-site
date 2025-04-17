import csv
import json
from abc import ABC, abstractmethod
from typing import List, Dict
from reportlab.lib.pagesizes import letter  # per pdf
from reportlab.pdfgen import canvas
import io

# Interfaccia per l'implementazione (Implementor)
class Exporter(ABC):
    @abstractmethod
    def export(self, publications: List[Dict]) -> bytes:
        pass

# Implementazioni concrete
class JSONExporter(Exporter):
    def export(self, publications: List[Dict]) -> bytes:
        data = json.dumps(publications, indent=2, ensure_ascii=False)
        return data.encode("utf-8")

class CSVExporter(Exporter):
    def export(self, publications: List[Dict]) -> bytes:
        output = io.StringIO()
        if not publications:
            return b""
        fieldnames = publications[0].keys()
        writer = csv.DictWriter(output, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(publications)
        return output.getvalue().encode("utf-8")

class PDFExporter(Exporter):
    def export(self, publications: List[Dict]) -> bytes:
        buffer = io.BytesIO()
        c = canvas.Canvas(buffer, pagesize=letter)
        y = 750
        c.setFont("Helvetica", 12)
        c.drawString(100, y, "Elenco delle Pubblicazioni")
        y -= 30
        for pub in publications:
            c.drawString(100, y, f"Titolo: {pub['title']}")
            y -= 20
            c.drawString(100, y, f"Autori: {pub['authors']}")
            y -= 20
            c.drawString(100, y, f"Anno: {pub['year']}")
            y -= 20
            c.drawString(100, y, f"Categoria: {pub['category']}")
            y -= 20
            c.drawString(100, y, f"Abstract: {pub['abstract'][:100]}...")
            y -= 40
            if y < 50:
                c.showPage()
                y = 750
        c.showPage()
        c.save()
        buffer.seek(0)
        return buffer.read()

# Astrazione 
class PublicationExporter:
    def __init__(self, exporter: Exporter):
        self.exporter = exporter

    def export(self, publications: List[Dict]) -> bytes:
        return self.exporter.export(publications)

    def set_exporter(self, exporter: Exporter):
        self.exporter = exporter