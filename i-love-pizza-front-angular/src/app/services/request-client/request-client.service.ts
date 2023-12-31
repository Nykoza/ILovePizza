import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestClientService {
  private baseUrl = 'http://localhost:3333';
  private bearerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibmljb0B3ZWJjZC5mciIsImlhdCI6MTcwMzg2ODcwMSwiZXhwIjoxNzAzODcyMzAxfQ.kjByKZ1h9WPyqJQfDViBLS9uIaNDaXVzkfsCy06z20U';
  private readonly httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
    this.httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`,
      'Content-Type': 'application/json',
    });
  }

  get<R>(path: string): Observable<R> {
    return this.http.get<R>(this.baseUrl + path, {
      headers: this.getHeaders(),
    });
  }

  patch<R, B>(path: string, body: B): Observable<R> {
    return this.http.patch<R>(this.baseUrl + path, body, {
      headers: this.getHeaders(),
    });
  }

  post<R, B>(path: string, body: B): Observable<R> {
    return this.http.post<R>(this.baseUrl + path, body, {
      headers: this.getHeaders(),
    });
  }

  postUnsecured<R, B>(path: string, body: B): Observable<R> {
    return this.http.post<R>(this.baseUrl + path, body, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json',
    });
  }

  private getAccessToken(): string {
    return this.localStorageService.get('access_token') ?? 'no_access_token';
  }
}
