import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <div
            class="bg-gray-100 min-h-screen flex items-center justify-center w-full"
        >
            <ng-content />
            <router-outlet />
        </div>
    `,
    styles: [],
})
export class AuthLayoutComponent {}
