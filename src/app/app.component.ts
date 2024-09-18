import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from '@shared/service/notification.service';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ToastModule],
    template: `<p-toast position="top-right" /> <router-outlet />`,
    styles: [],
})
export class AppComponent implements OnInit {
    private primengConfig = inject(PrimeNGConfig);
    private notificationService = inject(NotificationService);

    ngOnInit(): void {
        this.configurePrimeNG();
        this.notificationService.showSuccess('dsadsadsadsa');
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
