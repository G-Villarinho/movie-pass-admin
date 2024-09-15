import { Component, inject, OnInit } from '@angular/core';
import { CardWrapperComponent } from '@features/auth/components/card-wrapper/card-wrapper.component';
import { AuthLayoutComponent } from '../../auth.layout.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { AuthStore } from '@core/store/auth.store';
import { Router } from '@angular/router';
import { map, pipe } from 'rxjs';
import { DashBoardRoutesEnum } from '@shared/enums/routes/dashboard-routes.enum';

@Component({
    selector: 'app-sign-in-page',
    standalone: true,
    imports: [CardWrapperComponent, AuthLayoutComponent, SignInFormComponent],
    templateUrl: './sign-in-page.component.html',
    styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent implements OnInit {
    private authStore = inject(AuthStore);
    private router = inject(Router);

    ngOnInit(): void {
        this.authStore.isLoggedIn$
            .pipe(map((isLogged) => !!isLogged))
            .subscribe((isLogged) => {
                if (isLogged) {
                    this.navigatToHome();
                }
            });
    }

    private navigatToHome() {
        const url = [DashBoardRoutesEnum.PATH, DashBoardRoutesEnum.OVERVIEW];
        this.router.navigate(url);
    }
}
