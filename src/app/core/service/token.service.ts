import { inject, Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { LocalStorageService } from '@shared/service/local-storage.service';
import { jwtDecode } from 'jwt-decode';

const TOKEN = 'MoviePass.token';

type tokenPayload = {
    moviePassId: string;
    firstName: string;
    lastName: string;
    email: string;
};

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    localStorageService = inject(LocalStorageService<string>);

    decodeToken(token: string) {
        try {
            const decodedToken = jwtDecode<tokenPayload>(token);
            const user: User = {
                id: decodedToken.moviePassId,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                email: decodedToken.email,
            };
            return user;
        } catch (error) {
            return null;
        }
    }

    saveToken(token: string) {
        this.localStorageService.setItem(TOKEN, token);
    }

    getToken() {
        return this.localStorageService.getItem(TOKEN);
    }

    clearToken(): void {
        this.localStorageService.removeItem(TOKEN);
    }
}
