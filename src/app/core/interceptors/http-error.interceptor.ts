import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@core/store/auth.store';
import { AuthRoutesEnum } from '@shared/enums/routes/auth-routes.enum';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authStore = inject(AuthStore);

    const errorActions: { [key: number]: (error: HttpErrorResponse) => void } =
        {
            401: (error: HttpErrorResponse) => {
                const errorTitle = getErrorTitle(error);
                if (errorTitle === 'Access Denied') {
                    authStore.signOut();
                    router.navigate([
                        AuthRoutesEnum.PATH,
                        AuthRoutesEnum.SIGN_IN,
                    ]);
                }
            },
            403: (error: HttpErrorResponse) => {
                authStore.signOut();
                router.navigate(['/unauthorized']);
            },
            404: () => {
                router.navigate(['/not-found']);
            },
            500: (error: HttpErrorResponse) => {
                console.error(getErrorMessage(error));
            },
        };

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const action = errorActions[error.status];
            if (action) {
                action(error);
            } else {
                console.error(getErrorMessage(error));
            }

            return throwError(() => error);
        })
    );
};

function getErrorTitle(error: HttpErrorResponse): string {
    return error.error && error.error.title ? error.error.title : '';
}

function getErrorMessage(error: HttpErrorResponse): string {
    const defaultMessage = 'An unexpected error occurred.';

    const message =
        error.error instanceof ErrorEvent
            ? error.error.message
            : error.error && error.error.details
            ? error.error.details
            : error.error && error.error.error
            ? error.error.error
            : `HTTP error ${error.status}: ${error.statusText}`;

    return message || defaultMessage;
}
