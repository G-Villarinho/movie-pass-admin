import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, output, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [CommonModule, ToastModule, LucideAngularModule],
    templateUrl: './movie-upload-image.component.html',
    styleUrl: './movie-upload-image.component.scss',
    providers: [MessageService],
})
export class MovieImageUploadComponent {
    @Output() imagesChange = new EventEmitter<File[]>();

    private messageService = inject(MessageService);

    protected imagePreviews: string[] = [];
    protected images: File[] = [];

    onImageChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (!(files && files.length > 0)) {
            return;
        }

        if (this.images.length + files.length <= 3) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.images.push(file);

                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    const result = e.target?.result as string;
                    this.imagePreviews.push(result);
                };
                reader.readAsDataURL(file);
            }
            this.imagesChange.emit(this.images);
        } else {
            this.showWarningToast('You can only upload up to 3 images.');
        }
    }

    removeImage(index: number) {
        this.images.splice(index, 1);
        this.imagePreviews.splice(index, 1);
        this.imagesChange.emit(this.images);
    }

    private showWarningToast(message: string) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: message,
        });
    }
}
