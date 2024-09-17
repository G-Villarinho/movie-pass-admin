import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { IndicativeRating } from '@features/dashboard/models/indicativeRating';
import { environment } from '@environments/environment.development';
import { MoviePayload } from '@features/dashboard/models/payloads/movie.payload';
import { Movie } from '../models/movie';

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
}
