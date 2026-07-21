from __future__ import annotations

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
from app.models.user import User


def get_token_user(request: Request) -> dict:
    """Middleware'in request.state.user'a yazdığı JWT payload'ını döner.
    DB'ye gitmez — hızlı, her exapi handler'da kullanılabilir."""
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Oturum bulunamadı",
        )
    return user


async def get_current_user(
    token_user: dict = Depends(get_token_user),
    db: AsyncSession = Depends(get_db),
) -> User:
    """JWT'deki user id ile DB'den tam User kaydını çeker.
    Kullanıcının aktif olup olmadığını doğrular."""
    result = await db.execute(
        select(User).where(User.id == token_user["id"], User.is_active.is_(True))
    )
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Kullanıcı bulunamadı veya devre dışı",
        )
    return user
