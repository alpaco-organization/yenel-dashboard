from __future__ import annotations

from datetime import datetime, timedelta, timezone

import bcrypt
import jwt

from app.config import settings

_cfg = settings.crypto


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_access_token(subject: str, extra: dict | None = None) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "iat": now,
        "exp": now + timedelta(minutes=_cfg.access_token_expires_minute),
        "type": "access",
        **(extra or {}),
    }
    return jwt.encode(payload, _cfg.private_key, algorithm=_cfg.algorithm)


def create_refresh_token(subject: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "iat": now,
        "exp": now + timedelta(days=_cfg.refresh_token_expires_days),
        "type": "refresh",
    }
    return jwt.encode(payload, _cfg.private_key, algorithm=_cfg.algorithm)


def decode_token(token: str) -> dict:
    return jwt.decode(token, _cfg.public_key, algorithms=[_cfg.algorithm])
