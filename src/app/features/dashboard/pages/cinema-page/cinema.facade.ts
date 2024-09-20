import { inject, Injectable, OnDestroy } from '@angular/core';
import { PaginatePayload } from '@core/models/payloads/paginate.payload';
import { CinemaPayload } from '@features/dashboard/models/payloads/cinema.payload';
import { CinemaService } from '@features/dashboard/services/cinema.service';
import { CinemaStore } from '@features/dashboard/store/cinema.store';
import { switchMap, tap, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CinemaFacade implements OnDestroy {
    private cinemaStore = inject(CinemaStore);
    private cinemaService = inject(CinemaService);
    private destroy$ = new Subject<void>();

    cinemasPaginate$ = this.cinemaStore.cinemasPaginate$;
    paginationState$ = this.cinemaStore.paginationState$;

    constructor() {
        this.initializeLoadCinemas();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeLoadCinemas() {
        this.paginationState$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(({ page, limit, sort }: PaginatePayload) =>
                    this.cinemaService.fetchCinemasPaginates(page, limit, sort)
                )
            )
            .subscribe((data) => {
                this.cinemaStore.setCinemas(data);
            });
    }

    setPaginationState(page: number, limit: number, sort?: string) {
        this.cinemaStore.setPaginationState(page, limit, sort);
    }

    createCinema(payload: CinemaPayload) {
        return this.cinemaService
            .create(payload)
            .pipe(tap(() => this.setPaginationState(1, 10)));
    }

    deleteCinema(id: string) {
        return this.cinemaService
            .delete(id)
            .pipe(tap(() => this.setPaginationState(1, 10)));
    }
}
