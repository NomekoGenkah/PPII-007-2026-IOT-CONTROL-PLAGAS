from fastapi import FastAPI

app = FastAPI(
    title="Control de Plagas API",
    description="Backend para detección y control de plagas",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "El backend está funcionando correctamente"
    }