import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DashboardInputComponent } from '@features/dashboard/components/dashboard-input/dashboard-input.component';
import { MovieService } from '@features/dashboard/services/movie.service';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LucideAngularModule } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MovieImageUploadComponent } from './movie-upload-image/movie-upload-image.component';

@Component({
    selector: 'app-create-movie-page',
    standalone: true,
    imports: [
        HeaderComponent,
        LucideAngularModule,
        CommonModule,
        DashboardInputComponent,
        ToastModule,
        ReactiveFormsModule,
        MovieImageUploadComponent,
    ],
    templateUrl: './create-movie-page.component.html',
    styleUrl: './create-movie-page.component.scss',
    providers: [MessageService],
})
export class CreateMoviePageComponent {
    private movieService = inject(MovieService);
    private formBuilder = inject(NonNullableFormBuilder);
    private messageService = inject(MessageService);

    protected indicativeRatings$ = this.movieService.getAllIndicativeRatings();
    protected imagePreviews: string[] = [];
    protected images: File[] = [];
    protected movieForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.maxLength(255)]],
        duration: [null, [Validators.required, Validators.min(1)]],
        indicativeRating: [null, [Validators.required]],
    });

    onImagesChange(images: File[]) {
        this.images = images;
    }

    onSubmit() {
        if (this.movieForm.invalid) {
            this.showWarningToast('Please fill in all required fields.');
            return;
        }

        const { title, duration, indicativeRating } = this.movieForm.value;

        if (!title || !duration || !indicativeRating) {
            this.showWarningToast('Please fill in all required fields.');
            return;
        }

        const moviePayload = {
            title: title,
            duration: duration,
            indicativeRatingId: indicativeRating,
        };

        this.movieService.createMovie(moviePayload, this.images).subscribe({
            next: () => {
                this.showSuccessToast('Movie created successfully.');
                this.movieForm.reset();
                this.images = [];
            },
            error: (err) => {
                this.showWarningToast(
                    'Failed to create movie. Please try again.'
                );
            },
        });
    }

    private showWarningToast(message: string) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: message,
        });
    }

    private showSuccessToast(message: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }
}
