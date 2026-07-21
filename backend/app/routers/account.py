from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.dependencies import get_token_user, get_current_user
from app.models.user import User
from app.schemas.auth import TokenResponse, UserResponse
from app.services.auth import create_access_token, decode_token
from app.config import settings
import jwt

router = APIRouter(prefix="/account", tags=["account"])

_COOKIE_OPTS: dict = {
    "httponly": True,
    "samesite": "lax",
    "secure": False,
    "path": "/",
}


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Refresh token bulunamadı")

    try:
        payload = decode_token(token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token süresi doldu")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Geçersiz refresh token")

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Geçersiz token tipi")

    user_id = payload.get("sub")
    result = await db.execute(
        select(User).where(User.id == user_id, User.is_active.is_(True))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="Kullanıcı bulunamadı")

    extra = {"name": user.name, "role": user.role}
    new_access = create_access_token(user.id, extra)

    response.set_cookie(
        key="access_token",
        value=new_access,
        max_age=settings.crypto.access_token_expires_minute * 60,
        **_COOKIE_OPTS,
    )

    return TokenResponse(
        user=UserResponse(id=user.id, email=user.email, name=user.name, role=user.role),
    )


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Çıkış yapıldı"}


@router.get("/me", response_model=UserResponse)
async def me(user: User = Depends(get_current_user)):
    return UserResponse(id=user.id, email=user.email, name=user.name, role=user.role)
