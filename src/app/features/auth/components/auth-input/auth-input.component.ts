import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

type Type = 'text' | 'password' | 'email';

@Component({
    selector: 'app-auth-input',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    template: `
        <div class="w-full">
            <label
                class="block text-sm font-medium text-gray-700 mb-2"
                [ngClass]="{
                    'text-gray-700': !control().invalid || !control().touched,
                    'text-red-600': control().invalid && control().touched
                }"
                >{{ label() }}</label
            >
            <input
                type="{{ type() }}"
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-gray-800 focus:border-gray-800"
                [autofocus]="autoFocus()"
                [disabled]="disabled()"
                [placeholder]="placeholder()"
                [formControl]="control()"
            />
            <small
                class="text-red-600 mt-1 block font-medium"
                *ngIf="control().invalid && control().touched"
            >
                {{ errorMessage }}
            </small>
        </div>
    `,
    styles: [],
})
export class AuthInputComponent {
    type = input<Type>('text');
    placeholder = input('');
    label = input('');
    autoFocus = input(false);
    disabled = input(false);
    control = input.required<FormControl<unknown>>();

    get errorMessage(): string {
        if (this.control().errors?.['required']) {
            return 'This field is required.';
        }

        if (this.control().errors?.['email']) {
            return 'Please enter a valid email address.';
        }

        return 'Invalid field.';
    }
}
