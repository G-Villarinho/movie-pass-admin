import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CinemaPayload } from '@features/dashboard/models/payloads/cinema.payload';
import { Observable, take } from 'rxjs';
import { environment } from '@environments/environment.development';
import { Pagination } from '@core/models/pagination';
import { Cinema } from '@features/dashboard/models/cinema';

@Injectable({
    providedIn: 'root',
})
export class CinemaService {
    private readonly apiUrl = `${environment.baseUrl}/cinemas`;
    private readonly http = inject(HttpClient);

    create({ name, location }: CinemaPayload): Observable<Cinema> {
        return this.http.post<Cinema>(this.apiUrl, { name, location });
    }

    fetchCinemasPaginates(
        page: number,
        limit: number,
        sort?: string
    ): Observable<Pagination<Cinema>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('sort', sort || '');

        return this.http
            .get<Pagination<Cinema>>(this.apiUrl, { params })
            .pipe(take(1));
    }

    delete(id: string): Observable<null> {
        return this.http.delete<null>(`${this.apiUrl}/${id}`).pipe(take(1));
    }
}
