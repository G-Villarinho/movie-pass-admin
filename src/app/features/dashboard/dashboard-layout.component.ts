import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@core/components/navbar/navbar.component';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';
import { SidebarService } from '@core/service/sidebar.service';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [RouterOutlet, SidebarComponent, NavbarComponent, CommonModule],
    template: `
        <div class="h-screen flex overflow-hidden bg-gray-100">
            <app-sidebar />
            <main
                class="transition-all duration-500 flex-1"
                [ngClass]="{ 'ml-72': sidebarState$ | async }"
            >
                <app-navbar />
                <router-outlet />
            </main>
        </div>
    `,
    styles: [],
})
export class DashboardLayoutComponent {
    private readonly sidebarService = inject(SidebarService);

    protected sidebarState$ = this.sidebarService.sidebarState$;
}
