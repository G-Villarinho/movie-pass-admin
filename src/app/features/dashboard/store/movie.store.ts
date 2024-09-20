import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from '@core/models/pagination';
import { Movie } from '@features/dashboard/models/movie';

@Injectable({
    providedIn: 'root',
})
export class MovieStore {
    private moviesPaginateSubject =
        new BehaviorSubject<Pagination<Movie> | null>(null);
    private paginationStateSubject = new BehaviorSubject<{
        page: number;
        limit: number;
        sort?: string;
    }>({
        page: 1,
        limit: 5,
        sort: '',
    });

    public moviesPaginate$ = this.moviesPaginateSubject.asObservable();
    public paginationState$ = this.paginationStateSubject.asObservable();

    setPaginationState(page: number, limit: number, sort?: string): void {
        this.paginationStateSubject.next({ page, limit, sort });
    }

    setMoviesPaginate(paginationData: Pagination<Movie>): void {
        this.moviesPaginateSubject.next(paginationData);
    }

    getCurrentPaginationState() {
        return this.paginationStateSubject.getValue();
    }
}
