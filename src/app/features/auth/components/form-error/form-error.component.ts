import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-form-error',
    standalone: true,
    imports: [LucideAngularModule],
    template: `
        <div
            class="bg-red-100 p-3 text-red-700 px-4 rounded-md flex items-center gap-x-2 text-sm"
            role="alert"
        >
            <lucide-icon name="triangle-alert" class="w-5 h-5" />
            <p class="m">{{ message() }}</p>
        </div>
    `,
    styles: [],
})
export class FormErrorComponent {
    message = input.required<string>();
}
