from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

from app.supabase_client import get_supabase_client


app = FastAPI(
    title="Control de Plagas API",
    description="Backend para detección y control de plagas",
    version="1.0.0",
)


class LoginRequest(BaseModel):
    email: str
    password: str


@app.get("/")
def root():
    return {
        "message": "El backend está funcionando correctamente"
    }


@app.post("/login")
def login(credentials: LoginRequest):
    supabase = get_supabase_client()

    try:
        auth_response = supabase.auth.sign_in_with_password(
            {
                "email": credentials.email,
                "password": credentials.password,
            }
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
        )

    if auth_response.user is None or auth_response.session is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se pudo iniciar sesión",
        )

    try:
        profile_response = (
            supabase.table("profiles")
            .select("full_name, role")
            .eq("id", str(auth_response.user.id))
            .single()
            .execute()
        )

        profile = profile_response.data

    except Exception:
        profile = None

    return {
        "message": "Inicio de sesión exitoso",
        "access_token": auth_response.session.access_token,
        "refresh_token": auth_response.session.refresh_token,
        "token_type": "bearer",
        "user": {
            "id": str(auth_response.user.id),
            "email": auth_response.user.email,
            "full_name": profile.get("full_name") if profile else None,
            "role": profile.get("role") if profile else None,
        },
    }