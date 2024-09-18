import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LucideAngularModule } from 'lucide-angular';
import { CreateCinemaModalComponent } from './create-cinema-modal/create-cinema-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Observable, take, map } from 'rxjs';
import { CinemaFacade } from './cinema.facade';
import { PaginationComponent } from '@core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '@shared/service/notification.service';
import { ConfirmDeleteDialogComponent } from '@shared/components/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
    selector: 'app-cinema-page',
    standalone: true,
    imports: [
        HeaderComponent,
        LucideAngularModule,
        CreateCinemaModalComponent,
        ToastModule,
        CommonModule,
        PaginationComponent,
        ConfirmDeleteDialogComponent,
    ],
    providers: [DialogService, MessageService, CinemaFacade],
    templateUrl: './cinema-page.component.html',
    styleUrl: './cinema-page.component.scss',
})
export class CinemaPageComponent {
    private dialogService = inject(DialogService);
    private notificationService = inject(NotificationService);
    private ref: DynamicDialogRef | undefined;
    private cinemaFacade = inject(CinemaFacade);

    protected cinemas$ = this.cinemaFacade.cinemas$;
    protected title$: Observable<string> = this.cinemas$.pipe(
        map((paginationData) => `Cinemas (${paginationData?.totalRows ?? 0})`)
    );

    onPageChange(page: number) {
        this.cinemaFacade.setPaginationState(page, 10);
    }

    deleteCinema(id: string) {
        this.cinemaFacade.deleteCinema(id).subscribe({
            next: () => {
                this.notificationService.showSuccess(
                    'Successfully delete cinema'
                );
            },
        });
    }

    showCreateModal() {
        this.ref = this.dialogService.open(CreateCinemaModalComponent, {
            header: 'New cinema',
            width: '24vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
        });
    }

    showDeleteModal(cinemaId: string) {
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
                this.deleteCinema(cinemaId);
            }
        });
    }
}
