import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DashboardInputComponent } from '@features/dashboard/components/dashboard-input/dashboard-input.component';
import { CinemaPayload } from '@features/dashboard/models/payloads/cinema.payload';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CinemaFacade } from '../cinema.facade';

const MAX_LENGTH = 255;

@Component({
    selector: 'app-create-cinema-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardInputComponent,
        ToastModule,
    ],
    providers: [MessageService, CinemaFacade],
    templateUrl: './create-cinema-modal.component.html',
    styleUrl: './create-cinema-modal.component.scss',
})
export class CreateCinemaModalComponent {
    private formBuilder = inject(NonNullableFormBuilder);
    private ref = inject(DynamicDialogRef);
    private cinemaFacade = inject(CinemaFacade);

    protected cinemaForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(MAX_LENGTH)]],
        location: ['', [Validators.required, Validators.maxLength(MAX_LENGTH)]],
    });

    protected get formControl() {
        return this.cinemaForm.controls;
    }

    create() {
        if (this.cinemaForm.invalid) {
            this.cinemaForm.markAllAsTouched();
            return;
        }

        const cinema = this.cinemaForm.value as CinemaPayload;
        this.cinemaFacade.createCinema(cinema).subscribe({
            next: () => {
                this.ref.close({ success: true });
            },
        });
    }

    close() {
        this.ref.close({ success: false });
    }
}
