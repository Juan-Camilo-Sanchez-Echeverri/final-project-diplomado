import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Toy } from '../interfaces/toy.interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToyService {
  private apiUrl = `${environment.apiUrl}/toys`;
  private baseUrl = environment.urlBaseImages;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getToys(): Observable<Toy[]> {
    return this.http.get<Toy[]>(this.apiUrl);
  }

  getToyById(toyId: Toy['_id']): Observable<Toy> {
    return this.http.get<Toy>(`${this.apiUrl}/${toyId}`);
  }

  createToy(toy: Toy): Observable<Toy> {
    return this.http.post<Toy>(this.apiUrl, toy, {
      headers: this.getHeaders(),
    });
  }

  updateToy(toyId: Toy['_id'], toy: Toy): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${toyId}`, toy, {
      headers: this.getHeaders(),
    });
  }

  deleteToy(toyId: Toy['_id']): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${toyId}`, {
      headers: this.getHeaders(),
    });
  }

  uploadCover(toyId: Toy['_id'], cover: File) {
    const formData = new FormData();
    formData.append('cover', cover);

    return this.http.put(`${this.apiUrl}/${toyId}/cover`, formData, {
      headers: this.getHeaders(),
    });
  }

  updateImage(
    toyId: Toy['_id'],
    imageId: string,
    formData: FormData
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${toyId}/images/${imageId}`,
      formData,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteImage(toyId: Toy['_id'], imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${toyId}/image/${imageId}`, {
      headers: this.getHeaders(),
    });
  }

  uploadAdditionalImages(
    toyId: Toy['_id'],
    formData: FormData
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${toyId}/images`, formData, {
      headers: this.getHeaders(),
    });
  }

  getFullImageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl}`;
  }
}
