import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ToastModule],
    template: `<router-outlet />`,
    styles: [],
    providers: [MessageService],
})
export class AppComponent implements OnInit {
    private primengConfig = inject(PrimeNGConfig);

    ngOnInit(): void {
        this.configurePrimeNG();
    }

    private configurePrimeNG() {
        this.primengConfig.ripple = true;
        this.primengConfig.zIndex = {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100,
        };
    }
}
