import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from '@core/models/pagination';
import { Cinema } from '@features/dashboard/models/cinema';

@Injectable({
    providedIn: 'root',
})
export class CinemaStore {
    private cinemasPaginateSubject =
        new BehaviorSubject<Pagination<Cinema> | null>(null);
    private paginationStateSubject = new BehaviorSubject<{
        page: number;
        limit: number;
        sort?: string;
    }>({
        page: 1,
        limit: 10,
        sort: '',
    });

    public cinemasPaginate$ = this.cinemasPaginateSubject.asObservable();
    public paginationState$ = this.paginationStateSubject.asObservable();

    setPaginationState(page: number, limit: number, sort?: string): void {
        this.paginationStateSubject.next({ page, limit, sort });
    }

    setCinemas(paginationData: Pagination<Cinema>): void {
        this.cinemasPaginateSubject.next(paginationData);
    }

    getCurrentPaginationState() {
        return this.paginationStateSubject.getValue();
    }
}
