import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import Client, create_client


# Ruta de la carpeta backend
BASE_DIR = Path(__file__).resolve().parent.parent

# Cargar las variables guardadas en backend/.env
load_dotenv(BASE_DIR / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


if not SUPABASE_URL:
    raise RuntimeError("No se encontró SUPABASE_URL en el archivo .env")

if not SUPABASE_KEY:
    raise RuntimeError("No se encontró SUPABASE_KEY en el archivo .env")


supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_KEY,
)