import { Component, input } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    template: `
        <header class="border-b border-gray-300 pb-2 mb-4">
            <div class="flex flex-row items-center mb-4">
                <div class="flex flex-col">
                    <h1 class="text-gray-900 font-bold text-4xl">
                        {{ title() }}
                    </h1>
                    <p class="text-gray-500 font-normal text-sm">
                        {{ subtitle() }}
                    </p>
                </div>
                <div class="flex ml-auto gap-2">
                    <ng-content />
                </div>
            </div>
        </header>
    `,
    styles: [],
})
export class HeaderComponent {
    title = input('');
    subtitle = input('');
}
