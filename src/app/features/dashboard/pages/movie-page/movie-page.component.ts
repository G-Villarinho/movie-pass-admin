import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { NotificationService } from '@shared/service/notification.service';
import { LucideAngularModule } from 'lucide-angular';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MovieFacade } from '@features/dashboard/pages/movie-page/movie.facada';
import { ConfirmDeleteDialogComponent } from '@shared/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { take } from 'rxjs';
import { PaginationComponent } from '@core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';

const LIMIT_PAGE = 5;

@Component({
    selector: 'app-movie-page',
    standalone: true,
    imports: [
        HeaderComponent,
        ToastModule,
        LucideAngularModule,
        RouterModule,
        ConfirmDeleteDialogComponent,
        PaginationComponent,
        CommonModule,
        MenuModule,
    ],
    templateUrl: './movie-page.component.html',
    styleUrl: './movie-page.component.scss',
    providers: [MovieFacade, DialogService],
})
export class MoviePageComponent {
    private readonly notificationService = inject(NotificationService);
    private readonly movieFacade = inject(MovieFacade);
    private readonly dialogService = inject(DialogService);
    private ref: DynamicDialogRef | undefined;

    protected moviesPaginate$ = this.movieFacade.moviesPaginate$;
    protected selectedMovieId: string | null = null;

    protected onPageChange(page: number) {
        this.movieFacade.setPaginationState(page, LIMIT_PAGE);
    }

    protected toggleDropdown(movieId: string) {
        this.selectedMovieId =
            this.selectedMovieId === movieId ? null : movieId;
    }

    protected showDeleteModal(movieId: string) {
        this.ref = this.dialogService.open(ConfirmDeleteDialogComponent, {
            header: 'Delete cinema?',
            width: '18vw',
            modal: true,
            breakpoints: {
                '960px': '50vw',
                '640px': '50vw',
            },
        });

        this.ref.onClose.pipe(take(1)).subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.deleteMovie(movieId);
            }
        });
    }

    private deleteMovie(id: string) {
        this.movieFacade.deleteCinema(id).subscribe({
            next: () => {
                this.notificationService.showSuccess(
                    'Successfully delete movie'
                );
            },
        });
    }
}
