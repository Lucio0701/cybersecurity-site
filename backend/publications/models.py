from pydantic import BaseModel

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