import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Toy } from '../interfaces/toy.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToyService {
  private apiUrl = 'http://localhost:4000/api/v1.0/toys';
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getToys(): Observable<Toy[]> {
    return this.http.get<Toy[]>(this.apiUrl);
  }

  createToy(toy: Toy): Observable<Toy> {
    return this.http.post<Toy>(this.apiUrl, toy, {
      headers: this.getHeaders(),
    });
  }

  uploadCover(toyId: string, cover: File) {
    const formData = new FormData();
    formData.append('cover', cover);

    return this.http.put(`${this.apiUrl}/${toyId}/cover`, formData, {
      headers: this.getHeaders(),
    });
  }

  getFullImageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl}`;
  }
}
