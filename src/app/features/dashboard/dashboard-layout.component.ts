import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { SidebarService } from '@core/service/sidebar.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        SidebarComponent,
        NavbarComponent,
        CommonModule,
        ToastModule,
    ],
    template: `
        <div class="h-screen flex overflow-hidden bg-gray-100">
            <p-toast />
            <app-sidebar />
            <main
                class="transition-all duration-500 flex-1 overflow-y-auto"
                [ngClass]="{ 'ml-72': sidebarState$ | async }"
            >
                <app-navbar />
                <div class="p-4">
                    <router-outlet />
                </div>
            </main>
        </div>
    `,
    styles: [],
    providers: [MessageService],
})
export class DashboardLayoutComponent {
    private readonly sidebarService = inject(SidebarService);

    protected sidebarState$ = this.sidebarService.sidebarState$;
}
