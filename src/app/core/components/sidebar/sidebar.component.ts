import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '@core/service/sidebar.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, RouterModule, CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
    private sidebarService = inject(SidebarService);

    protected sidebarItems$ = this.sidebarService.sidebarItems$;
    protected sidebarState$ = this.sidebarService.sidebarState$;

    close() {
        this.sidebarService.setSidebarState(false);
    }
}
