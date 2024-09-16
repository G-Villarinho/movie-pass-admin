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
        // Manipular as imagens selecionadas
    }
    removeImage(index: number) {
        this.images.splice(index, 1);
        this.imagePreviews.splice(index, 1);
    }

    private showWarningToast(message: string) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: message,
        });
    }
}
