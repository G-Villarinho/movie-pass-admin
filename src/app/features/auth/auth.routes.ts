import { Routes } from '@angular/router';
import { AuthRoutesEnum } from '@shared/enums/routes/auth-routes.enum';

export const authRoutes: Routes = [
    {
        path: AuthRoutesEnum.SIGN_IN,
        title: 'Movie Pass - Sign in',
        loadComponent: () =>
            import(
                '@features/auth/pages/sign-in-page/sign-in-page.component'
            ).then((m) => m.SignInPageComponent),
    },
];
