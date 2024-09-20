import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable, take } from 'rxjs';
import { IndicativeRating } from '@features/dashboard/models/indicativeRating';
import { environment } from '@environments/environment.development';
import { MoviePayload } from '@features/dashboard/models/payloads/movie.payload';
import { Movie } from '@features/dashboard/models/movie';
import { Pagination } from '@core/models/pagination';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private readonly adminApiUrl = `${environment.baseUrl}/admin/movies`;
    private readonly apiUrl = `${environment.baseUrl}/movies`;

    private readonly http = inject(HttpClient);

    getAllIndicativeRatings(): Observable<IndicativeRating[]> {
        return this.http.get<IndicativeRating[]>(
            `${this.apiUrl}/indicative-rating`
        );
    }

    createMovie(payload: MoviePayload, images: File[]): Observable<Movie> {
        const formData = new FormData();
        formData.append('title', payload.title);
        formData.append('duration', payload.duration.toString());
        formData.append('indicativeRatingId', payload.indicativeRatingId);

        images.forEach((image, index) => {
            formData.append('images', image, image.name);
        });

        return this.http.post<Movie>(`${this.adminApiUrl}`, formData);
    }

    fetchPaginateMovies(
        page: number,
        limit: number,
        sort?: string
    ): Observable<Pagination<Movie>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('sort', sort || '');

        return this.http
            .get<Pagination<Movie>>(this.adminApiUrl, { params })
            .pipe(take(1));
    }

    deleteMovie(id: string): Observable<null> {
        return this.http
            .delete<null>(`${this.adminApiUrl}/${id}`)
            .pipe(take(1));
    }
}
