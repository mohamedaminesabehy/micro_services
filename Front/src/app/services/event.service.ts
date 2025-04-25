import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evenement {
  id?: number;
  nom: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  capaciteMax: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:9094/events';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.apiUrl}/${id}`);
  }

  createEvent(event: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(`${this.apiUrl}/ajouter`, event);
  }

  updateEvent(id: number, event: Evenement): Observable<Evenement> {
    return this.http.put<Evenement>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMoyenneCapacite(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/M`);
  }
}