import {
    AfterViewInit,
    Directive,
    ElementRef,
    inject,
    Input,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appSuffix]',
    standalone: true,
})
export class SuffixDirective implements AfterViewInit {
    @Input('appSuffix') suffixText: string = '';

    private el = inject(ElementRef);
    private renderer = inject(Renderer2);

    ngAfterViewInit(): void {
        const parent = this.el.nativeElement.parentElement;

        const wrapper = this.renderer.createElement('div');
        this.renderer.addClass(wrapper, 'w-full');

        const suffix = this.renderer.createElement('span');
        const text = this.renderer.createText(this.suffixText);
        this.renderer.appendChild(suffix, text);
        this.renderer.addClass(suffix, 'ml-2');
        this.renderer.addClass(suffix, 'text-gray-500');
        this.renderer.addClass(suffix, 'text-sm');

        this.renderer.appendChild(wrapper, this.el.nativeElement);
        this.renderer.appendChild(wrapper, suffix);

        this.renderer.appendChild(parent, wrapper);
    }
}
