import { Component, input } from '@angular/core';

@Component({
    selector: 'app-card-wrapper',
    standalone: true,
    imports: [],
    template: `
        <div
            class="w-screen sm:w-[32rem] max-w-md bg-white shadow-md rounded-lg px-6 py-10 h-screen sm:h-auto"
        >
            <div class="flex items-center flex-col space-y-4 mb-12">
                <h1 class="text-4xl">🔒<strong>Auth</strong></h1>

                <p class="text-md text-gray-600">
                    {{ title() }}
                </p>
            </div>
            <ng-content></ng-content>
        </div>
    `,
    styles: [],
})
export class CardWrapperComponent {
    title = input('');
}
