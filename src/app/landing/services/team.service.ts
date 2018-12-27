import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = 'http:///localhost:3000';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  getTeamMembers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/members`);
  }

  addTeamMember(data): Observable<any> {
    console.log('hi from service');
    return this.http.post<any>(`${this.baseUrl}/members`, JSON.stringify(data), { headers: this.headers });
  }

  editTeamMember(data): Observable<any> {
    if (data && typeof data === 'object') {
      return this.http.put<any>(`${this.baseUrl}/members/${data.id}`, JSON.stringify(data), { headers: this.headers });
    }
    return null;
  }
}
