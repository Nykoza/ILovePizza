import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { RequestClientService } from '../request-client/request-client.service';
import { Auth, AuthPayload } from './auth';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private messageService: MessageService,
    private requestService: RequestClientService,
    private localStorageService: LocalStorageService,
  ) {}

  signIn(email: string, password: string): Observable<any> {
    const body: AuthPayload = { email: email, password };
    return this.requestService
      .postUnsecured<Auth, any>('/auth/signin', body)
      .pipe(
        tap((auth) =>
          this.localStorageService.set('access_token', auth.access_token),
        ),
        catchError(this.handleError<Auth>('SignIn')),
      );
  }

  signUp(email: string, password: string): Observable<any> {
    const body: AuthPayload = { email: email, password };
    return this.requestService
      .postUnsecured<Auth, any>('/auth/signup', body)
      .pipe(
        tap((auth) =>
          this.localStorageService.set('access_token', auth.access_token),
        ),
        catchError(this.handleError<Auth>('SignUp')),
      );
  }

  getAccessToken() {
    return this.localStorageService.get('access_token');
  }

  isSignedIn(): boolean {
    const accessToken = this.localStorageService.get('access_token');
    if (!accessToken) {
      return false;
    }

    const jwtPayload = jwtDecode(accessToken);
    if (!jwtPayload || !jwtPayload.exp) return false;

    if (Date.now() >= jwtPayload.exp * 1000) {
      return false;
    }

    return true;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Auth: ${message}`);
  }
}
