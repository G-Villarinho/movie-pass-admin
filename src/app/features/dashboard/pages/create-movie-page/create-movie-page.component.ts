import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
    FormsModule,
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
import { Router } from '@angular/router';
import { DashBoardRoutesEnum } from '@shared/enums/routes/dashboard-routes.enum';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { NotificationService } from '@shared/service/notification.service';

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
        SliderModule,
        FormsModule,
        DropdownModule,
    ],
    templateUrl: './create-movie-page.component.html',
    styleUrl: './create-movie-page.component.scss',
    providers: [MessageService],
})
export class CreateMoviePageComponent {
    private movieService = inject(MovieService);
    private formBuilder = inject(NonNullableFormBuilder);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

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

    onSliderChange(event: any) {
        this.movieForm.controls.duration.setValue(event.value);
    }

    onSubmit() {
        if (this.movieForm.invalid) {
            this.notificationService.showWarning(
                'Please fill in all required fields.'
            );
            return;
        }

        const { title, duration, indicativeRating } = this.movieForm.value!;

        if (!title || !duration || !indicativeRating) {
            this.notificationService.showWarning(
                'Please fill in all required fields.'
            );
            return;
        }

        const moviePayload = {
            title: title,
            duration: duration,
            indicativeRatingId: indicativeRating,
        };

        this.movieService.createMovie(moviePayload, this.images).subscribe({
            next: () => {
                this.notificationService.showSuccess(
                    'Movie created successfully.'
                );
                this.notificationService.showInfo(
                    'Image(s) are loading in the background'
                );
                this.movieForm.reset();
                this.images = [];
                this.router.navigate([
                    DashBoardRoutesEnum.PATH,
                    DashBoardRoutesEnum.MOVIE,
                ]);
            },
        });
    }
}
