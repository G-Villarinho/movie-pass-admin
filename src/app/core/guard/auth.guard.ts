import { firstValueFrom } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@core/store/auth.store';
import { AuthRoutesEnum } from '@shared/enums/routes/auth-routes.enum';

export const AuthGuard: CanActivateFn = async () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    const logged = await firstValueFrom(authStore.isLoggedIn$);
    if (!logged) {
        authStore.signOut();
        router.navigate([AuthRoutesEnum.PATH, AuthRoutesEnum.SIGN_IN]);
        return false;
    }

    return true;
};
