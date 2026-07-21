"""Seed the database with a demo user.

Usage: cd backend && python -m app.seed
"""
from __future__ import annotations

import asyncio

from sqlalchemy import select

from app.db import get_session_factory, get_engine, Base
from app.models.user import User
from app.services.auth import hash_password


async def seed():
    engine = get_engine()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with get_session_factory()() as session:
        result = await session.execute(select(User).where(User.email == "admin@yeneletiket.com"))
        if result.scalar_one_or_none():
            print("Demo kullanıcı zaten mevcut, atlanıyor.")
            return

        user = User(
            email="admin@yeneletiket.com",
            hashed_password=hash_password("123456"),
            name="Yenel Yönetim",
            role="Genel Müdür",
        )
        session.add(user)
        await session.commit()
        print(f"Demo kullanıcı oluşturuldu: admin@yeneletiket.com (id={user.id})")

    await get_engine().dispose()


if __name__ == "__main__":
    asyncio.run(seed())
