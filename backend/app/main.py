from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import get_engine, Base
from app.middleware.auth import AuthMiddleware
from app.routers import auth
from app.routers import account


@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = get_engine()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title="Yenel Dashboard API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Public routes (/api/...) — no auth required ──
api_router = APIRouter(prefix="/api")
api_router.include_router(auth.router)


@api_router.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(api_router)

# ── Private routes (/exapi/...) — AuthMiddleware koruması altında ──
exapi_router = APIRouter(prefix="/exapi")
exapi_router.include_router(account.router)

app.include_router(exapi_router)
