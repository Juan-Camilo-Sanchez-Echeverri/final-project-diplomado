import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Comment, CommentDto } from './../interfaces/comment.interfaces';
import { envs } from '../../env';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${envs.apiUrl}/toys`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  addComment(toyId: string, comment: CommentDto): Observable<Comment> {
    const url = `${this.apiUrl}/${toyId}/comments`;
    return this.http.post<Comment>(url, comment, {
      headers: this.getHeaders(),
    });
  }

  deleteComment(toyId: string, commentId: string): Observable<void> {
    const url = `${this.apiUrl}/${toyId}/comments/${commentId}`;
    return this.http.delete<void>(url, {
      headers: this.getHeaders(),
    });
  }

  updateComment(
    toyId: string,
    commentId: string,
    comment: CommentDto
  ): Observable<Comment> {
    const url = `${this.apiUrl}/${toyId}/comments/${commentId}`;
    return this.http.put<Comment>(url, comment, {
      headers: this.getHeaders(),
    });
  }
}
