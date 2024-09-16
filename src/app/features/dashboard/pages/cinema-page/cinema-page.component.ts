import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { LucideAngularModule } from 'lucide-angular';
import { CreateCinemaModalComponent } from './create-cinema-modal/create-cinema-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Observable, take, map } from 'rxjs';
import { CinemaFacade } from './cinema.facade';
import { Pagination } from '@core/models/pagination';
import { Cinema } from '@features/dashboard/models/cinema';
import { PaginationComponent } from '@core/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';

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
    ],
    providers: [
        DialogService,
        MessageService,
        CinemaFacade,
        PaginationComponent,
    ],
    templateUrl: './cinema-page.component.html',
    styleUrl: './cinema-page.component.scss',
})
export class CinemaPageComponent {
    private dialogService = inject(DialogService);
    private messageService = inject(MessageService);
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
                this.showSuccessToast('Successfully delete cinema');
            },
        });
    }

    showModal() {
        this.ref = this.dialogService.open(CreateCinemaModalComponent, {
            header: 'New cinema',
            width: '24vw',
            modal: true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw',
            },
        });
        this.ref.onClose
            .pipe(take(1))
            .subscribe((result: { success: boolean }) => {
                if (result && result.success) {
                    this.showSuccessToast('Successfully created cinema');
                }
            });
    }

    private showSuccessToast(message: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }
}
