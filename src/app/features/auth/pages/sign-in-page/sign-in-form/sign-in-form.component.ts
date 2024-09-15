import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStore } from '@core/store/auth.store';
import { AuthInputComponent } from '@features/auth/components/auth-input/auth-input.component';
import { FormErrorComponent } from '@features/auth/components/form-error/form-error.component';
import { DashBoardRoutesEnum } from '@shared/enums/routes/dashboard-routes.enum';

@Component({
    selector: 'app-sign-in-form',
    standalone: true,
    imports: [
        AuthInputComponent,
        ReactiveFormsModule,
        FormErrorComponent,
        CommonModule,
    ],
    templateUrl: './sign-in-form.component.html',
    styleUrl: './sign-in-form.component.scss',
})
export class SignInFormComponent {
    private formBuilder = inject(NonNullableFormBuilder);
    private authStore = inject(AuthStore);
    private router = inject(Router);

    protected error$ = this.authStore.error$;
    protected signInForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    get formControl() {
        return this.signInForm.controls;
    }

    signIn() {
        if (this.signInForm.invalid) {
            this.signInForm.markAllAsTouched();
            return;
        }

        this.authStore
            .signIn(
                this.formControl.email.value!,
                this.formControl.password.value!
            )
            .subscribe({
                next: (response) => {
                    if (response) {
                        this.navigateToHome();
                    }
                },
            });
    }

    private navigateToHome() {
        const url = [DashBoardRoutesEnum.PATH, DashBoardRoutesEnum.OVERVIEW];
        this.router.navigate(url);
    }
}
