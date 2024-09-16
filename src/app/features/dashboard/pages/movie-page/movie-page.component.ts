import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { DashBoardRoutesEnum } from '@shared/enums/routes/dashboard-routes.enum';
import { LucideAngularModule } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-movie-page',
    standalone: true,
    imports: [HeaderComponent, ToastModule, LucideAngularModule, RouterModule],
    templateUrl: './movie-page.component.html',
    styleUrl: './movie-page.component.scss',
    providers: [MessageService],
})
export class MoviePageComponent {}
