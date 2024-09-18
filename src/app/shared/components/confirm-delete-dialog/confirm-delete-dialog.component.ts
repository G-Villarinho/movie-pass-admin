import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-confirm-delete-dialog',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    template: `
        <div class="flex flex-col w-full">
            <div
                class="bg-red-500 px-16 py-12 flex items-center justify-center rounded-lg mb-10"
            >
                <lucide-icon name="trash-2" class="w-20 h-20 text-white" />
            </div>
            <button
                class="w-full bg-gray-800 hover:bg-gray-700 duration-300 py-3 rounded-md text-white font-semibold mb-4"
                (click)="confirmDelete()"
            >
                Yes, delete it
            </button>
            <button
                class="w-full border-2 border-gray-800 hover:bg-gray-200 duration-300 py-3 rounded-md text-black font-semibold"
                (click)="cancel()"
            >
                No, Cancel
            </button>
        </div>
    `,
})
export class ConfirmDeleteDialogComponent {
    private ref = inject(DynamicDialogRef);

    confirmDelete() {
        this.ref.close(true);
    }

    cancel() {
        this.ref.close(false);
    }
}
