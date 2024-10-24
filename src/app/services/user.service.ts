import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.baseUrl}/${userId}`, { headers });
  }

  updateUserProfile(data: {
    avatar: string;
    password: string;
  }): Observable<User> {
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(data);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const userId = this.getUserId();
    return this.http.put<any>(`${this.baseUrl}/${userId}`, data, { headers });
  }

  getUserId(): string | null {
    const userId = localStorage.getItem('userId');
    return userId;
  }
}
