import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarService } from '@core/service/sidebar.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [LucideAngularModule, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    sidebarService = inject(SidebarService);

    protected sidebarState$ = this.sidebarService.sidebarState$;

    openSidebar() {
        this.sidebarService.setSidebarState(true);
    }
}
