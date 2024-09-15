import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignInResponse } from '@core/models/responses/sign-in.response';
import { environment } from '@environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly apiUrl = `${environment.baseUrl}/users`;

    private readonly http = inject(HttpClient);

    signIn(email: string, password: string) {
        return this.http.post<SignInResponse>(`${this.apiUrl}/sign-in`, {
            email,
            password,
        });
    }
}
