import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { AuthLayoutComponent } from '@features/auth/auth.layout.component';
import { DashboardLayoutComponent } from '@features/dashboard/dashboard-layout.component';
import { AuthRoutesEnum } from '@shared/enums/routes/auth-routes.enum';
import { DashBoardRoutesEnum } from '@shared/enums/routes/dashboard-routes.enum';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: `${AuthRoutesEnum.PATH}/${AuthRoutesEnum.SIGN_IN}`,
    },
    {
        path: AuthRoutesEnum.PATH,
        component: AuthLayoutComponent,
        loadChildren: () =>
            import('@features/auth/auth.routes').then((m) => m.authRoutes),
    },
    {
        path: DashBoardRoutesEnum.PATH,
        component: DashboardLayoutComponent,
        loadChildren: () =>
            import('@features/dashboard/dashboard.routes').then(
                (m) => m.dashboardRoutes
            ),
        canActivate: [AuthGuard],
    },
];
