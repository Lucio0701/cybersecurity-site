
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from auth.models import Token
from auth.utils import get_user, verify_password, create_access_token
from datetime import timedelta

router = APIRouter( tags=["auth"])

# Endpoint di login
@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenziali non valide")
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token({"sub": user.username, "role": user.role}, access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}