import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NotificationService } from '@shared/service/notification.service';
import { LucideAngularModule } from 'lucide-angular';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [CommonModule, ToastModule, LucideAngularModule],
    templateUrl: './movie-upload-image.component.html',
    styleUrls: ['./movie-upload-image.component.scss'],
})
export class MovieImageUploadComponent {
    @Output() imagesChange = new EventEmitter<File[]>();

    private notificationService = inject(NotificationService);

    protected imagePreviews: string[] = [];
    protected images: File[] = [];
    protected isDragging = false;

    onImageChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files) {
            this.handleFiles(files);
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        const files = event.dataTransfer?.files;
        if (files) {
            this.handleFiles(files);
        }
    }

    handleFiles(files: FileList) {
        if (this.images.length + files.length <= 3) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                if (this.isValidImage(file)) {
                    this.images.push(file);

                    const reader = new FileReader();
                    reader.onload = (e: ProgressEvent<FileReader>) => {
                        const result = e.target?.result as string;
                        this.imagePreviews.push(result);
                    };
                    reader.readAsDataURL(file);
                }
            }
            this.imagesChange.emit(this.images);
        } else {
            this.notificationService.showWarning(
                'You can only upload up to 3 images.'
            );
        }
    }

    isValidImage(file: File) {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return validTypes.includes(file.type) && file.size <= 5 * 1024 * 1024;
    }

    removeImage(index: number) {
        this.images.splice(index, 1);
        this.imagePreviews.splice(index, 1);
        this.imagesChange.emit(this.images);
    }
}
