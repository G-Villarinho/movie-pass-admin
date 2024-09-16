import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type Type = 'text' | 'password' | 'email';

@Component({
    selector: 'app-dashboard-input',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    template: `
        <div class="flex flex-col gap-2">
            <label
                class="text-sm font-semibold"
                [ngClass]="{
                    'text-gray-700': !control().invalid || !control().touched,
                    'text-red-600': control().invalid && control().touched
                }"
            >
                {{ label() }}
            </label>
            <input
                [type]="type()"
                [placeholder]="placeholder()"
                [autofocus]="autoFocus()"
                [disabled]="disabled()"
                [formControl]="control()"
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-800 focus:border-gray-800"
            />
            <small
                class="text-red-600 mt-1 block font-medium"
                *ngIf="control().invalid && control().touched"
            >
                {{ errorMessage }}
            </small>
        </div>
    `,
})
export class DashboardInputComponent {
    type = input<Type>('text');
    placeholder = input('');
    label = input('');
    autoFocus = input(false);
    disabled = input(false);
    control = input.required<FormControl<unknown>>();
    errorMessages = input<Record<string, string>>({});

    get errorMessage(): string {
        const errors = this.control().errors;
        if (!errors) {
            return 'Invalid field.';
        }

        for (const error in errors) {
            if (this.errorMessages()[error]) {
                return this.errorMessages()[error];
            }
        }

        return 'Invalid field.';
    }
}
