import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorResponse } from '@core/models/responses/error-response';
import { SignInResponse } from '@core/models/responses/sign-in.response';
import { User } from '@core/models/user';
import { AuthService } from '@core/service/auth.service';
import { TokenService } from '@core/service/token.service';
import { LocalStorageService } from '@shared/service/local-storage.service';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

const AUTH_DATA = 'MoviePass.Auth';

@Injectable({
    providedIn: 'root',
})
export class AuthStore {
    private userSubject = new BehaviorSubject<User | null>(null);
    private errorSubject = new BehaviorSubject<string>('');

    public user$: Observable<User | null> = this.userSubject.asObservable();
    public error$: Observable<string> = this.errorSubject.asObservable();
    public isLoggedIn$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private localStorageService: LocalStorageService<User>
    ) {
        this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
        this.loadUserFromLocalStorage();
    }

    signIn(email: string, password: string) {
        return this.authService.signIn(email, password).pipe(
            tap((signInResponse) => {
                this.handleSignInResponse(signInResponse);
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.handleError(error);
                }

                return of(null);
            })
        );
    }

    signOut() {
        this.tokenService.clearToken();
        this.localStorageService.removeItem(AUTH_DATA);
        this.userSubject.next(null);
    }

    private handleError(error: HttpErrorResponse): void {
        let errorMessage = 'An unknown error occurred. Please try again.';

        if (error.error) {
            const apiError: ErrorResponse = error.error;
            errorMessage = apiError.details;

            if (apiError.errors && apiError.errors.length > 0) {
                const fieldErrors = apiError.errors
                    .map((err) => `${err.field}: ${err.message}`)
                    .join(', ');
                errorMessage += ` (${fieldErrors})`;
            }
        }

        this.errorSubject.next(errorMessage);
    }

    private loadUserFromLocalStorage() {
        const user = this.localStorageService.getItem(AUTH_DATA);
        if (user) {
            this.userSubject.next(user);
        }
    }

    private handleSignInResponse(signInResponse: SignInResponse): void {
        this.tokenService.saveToken(signInResponse.token);
        const user = this.tokenService.decodeToken(signInResponse.token);
        this.localStorageService.setItem(AUTH_DATA, user!);
        this.userSubject.next(user);
    }
}
