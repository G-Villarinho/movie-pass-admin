import { Component } from '@angular/core';
import { SidebarComponent } from '@core/components/sidebar/sidebar.component';

@Component({
    selector: 'app-overview-page',
    standalone: true,
    imports: [SidebarComponent],
    templateUrl: './overview-page.component.html',
    styleUrl: './overview-page.component.scss',
})
export class OverviewPageComponent {}
