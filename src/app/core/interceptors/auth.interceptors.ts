import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/service/token.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const token = tokenService.getToken();

    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        return next(authReq);
    }

    return next(req);
};
