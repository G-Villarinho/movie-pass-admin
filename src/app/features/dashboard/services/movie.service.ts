import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicativeRating } from '../models/indicativeRating';
import { environment } from '@environments/environment.development';

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
}
