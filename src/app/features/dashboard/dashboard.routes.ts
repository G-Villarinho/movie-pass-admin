import { Routes } from '@angular/router';
import { DashBoardRoutesEnum } from '@shared/enums/routes/dashboard-routes.enum';

export const dashboardRoutes: Routes = [
    {
        path: DashBoardRoutesEnum.OVERVIEW,
        title: 'Movie Pass - Overview',
        loadComponent: () =>
            import(
                '@features/dashboard/pages/overview-page/overview-page.component'
            ).then((m) => m.OverviewPageComponent),
    },
    {
        path: DashBoardRoutesEnum.CINEMA,
        title: 'Movie Pass - Cinema',
        loadComponent: () =>
            import(
                '@features/dashboard/pages/cinema-page/cinema-page.component'
            ).then((m) => m.CinemaPageComponent),
    },
];
