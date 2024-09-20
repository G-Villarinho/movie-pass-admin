import { inject, Injectable, OnDestroy } from '@angular/core';
import { PaginatePayload } from '@core/models/payloads/paginate.payload';
import { MovieService } from '@features/dashboard/services/movie.service';
import { MovieStore } from '@features/dashboard/store/movie.store';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MovieFacade implements OnDestroy {
    private readonly movieStore = inject(MovieStore);
    private readonly movieService = inject(MovieService);
    private destroy$ = new Subject<void>();

    moviesPaginate$ = this.movieStore.moviesPaginate$;
    paginationState$ = this.movieStore.paginationState$;

    constructor() {
        this.initializeLoadMovies();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initializeLoadMovies() {
        this.paginationState$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(({ page, limit, sort }: PaginatePayload) =>
                    this.movieService.fetchPaginateMovies(page, limit, sort)
                )
            )
            .subscribe((data) => {
                this.movieStore.setMoviesPaginate(data);
            });
    }

    deleteCinema(id: string) {
        return this.movieService
            .deleteMovie(id)
            .pipe(tap(() => this.setPaginationState(1, 5)));
    }

    setPaginationState(page: number, limit: number, sort?: string) {
        this.movieStore.setPaginationState(page, limit, sort);
    }
}
