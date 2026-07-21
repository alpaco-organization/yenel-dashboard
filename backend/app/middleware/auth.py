from __future__ import annotations

from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import JSONResponse, Response

from app.services.auth import decode_token
import jwt


class AuthMiddleware(BaseHTTPMiddleware):
    """
    /exapi altındaki tüm isteklerde çalışır.
    HttpOnly cookie'den access_token'ı alır, RS256 ile doğrular,
    kullanıcı bilgilerini request.state.user'a yazar.
    """

    PROTECTED_PREFIX = "/exapi"

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        if not request.url.path.startswith(self.PROTECTED_PREFIX):
            return await call_next(request)

        token = request.cookies.get("access_token")
        if not token:
            return self._err(401, "Oturum bulunamadı")

        try:
            payload = decode_token(token)
        except jwt.ExpiredSignatureError:
            return self._err(401, "Oturum süresi doldu")
        except jwt.InvalidTokenError:
            return self._err(401, "Geçersiz token")

        if payload.get("type") != "access":
            return self._err(401, "Geçersiz token tipi")

        sub = payload.get("sub")
        if not sub:
            return self._err(401, "Token'da kullanıcı bilgisi yok")

        request.state.user = {
            "id": sub,
            "name": payload.get("name", ""),
            "role": payload.get("role", ""),
        }

        return await call_next(request)

    @staticmethod
    def _err(status: int, detail: str) -> JSONResponse:
        return JSONResponse(
            status_code=status,
            content={"detail": detail},
        )
