import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = 'http://localhost:9094/avis'; // Adjust port if needed

  constructor(private http: HttpClient) {}

  getReviewsByRecipeId(recetteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recette/${recetteId}`);
  }

  addReview(recetteId: number, review: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recette/${recetteId}`, review);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}