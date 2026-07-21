from __future__ import annotations

import pathlib
from functools import lru_cache

import yaml

_BASE_DIR = pathlib.Path(__file__).resolve().parent.parent.parent
_CONFIG_PATH = _BASE_DIR / "config.yaml"


class _DB:
    def __init__(self, raw: dict):
        self.host: str = raw.get("host", "")
        self.port: int = raw.get("port", )
        self.name: str = raw.get("name", "")
        self.user: str = raw.get("user", "")
        self.password: str = raw.get("password", "")

    @property
    def url(self) -> str:
        return (
            f"postgresql+asyncpg://{self.user}:{self.password}"
            f"@{self.host}:{self.port}/{self.name}"
        )

    @property
    def sync_url(self) -> str:
        return (
            f"postgresql://{self.user}:{self.password}"
            f"@{self.host}:{self.port}/{self.name}"
        )


class _Crypto:
    def __init__(self, raw: dict):
        self.private_key: str = raw.get("private_key", "")
        self.public_key: str = raw.get("public_key", "")
        self.access_token_expires_minute: int = raw.get("access_token_expires_minute", 30)
        self.refresh_token_expires_days: int = raw.get("refresh_token_expires_days", 7)
        self.algorithm: str = raw.get("algorithm", "")


class Settings:
    def __init__(self, path: pathlib.Path = _CONFIG_PATH):
        with open(path) as f:
            raw = yaml.safe_load(f)
        self.db = _DB(raw.get("db", {}))
        self.crypto = _Crypto(raw.get("crypto", {}))

        self.cors_origins: list[str] = raw.get("cors_origins", [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ])
        self.webhook_secret: str = raw.get("webhook_secret", "change-me")


@lru_cache
def _load() -> Settings:
    return Settings()


settings: Settings = _load()
