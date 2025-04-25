import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Image {
  url: string;
  _id: string;
}

export interface Toy {
  _id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  createdBy: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToyService {
  private apiUrl = 'http://localhost:4000/api/v1.0/toys';
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getToys(): Observable<Toy[]> {
    return this.http.get<Toy[]>(this.apiUrl);
  }

  getFullImageUrl(imageUrl: string): string {
    return `${this.baseUrl}${imageUrl}`;
  }
}
