from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse, UserResponse
from app.services.auth import (
    verify_password,
    create_access_token,
    create_refresh_token,
)
from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

_COOKIE_OPTS: dict = {
    "httponly": True,
    "samesite": "lax",
    "secure": False,
    "path": "/",
}


@router.post("/login", response_model=TokenResponse)
async def login(
    body: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where(User.email == body.email, User.is_active.is_(True))
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-posta veya şifre hatalı",
        )

    extra = {"name": user.name, "role": user.role}
    access = create_access_token(user.id, extra)
    refresh = create_refresh_token(user.id)

    response.set_cookie(
        key="access_token",
        value=access,
        max_age=settings.crypto.access_token_expires_minute * 60,
        **_COOKIE_OPTS,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh,
        max_age=settings.crypto.refresh_token_expires_days * 86400,
        **_COOKIE_OPTS,
    )

    return TokenResponse(
        user=UserResponse(id=user.id, email=user.email, name=user.name, role=user.role),
    )
