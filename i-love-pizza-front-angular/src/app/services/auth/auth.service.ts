import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { RequestClientService } from '../request-client/request-client.service';
import { Auth, AuthPayload } from './auth';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private messageService: MessageService,
    private requestService: RequestClientService,
  ) {}

  signIn(email: string, password: string): Observable<any> {
    const body: AuthPayload = { email: email, password };
    return this.requestService.post('/auth/signin', body).pipe(
      tap((_) => this.log(`Signin with email=${email}`)),
      catchError(this.handleError<Auth>('SignIn')),
    );
  }

  signUp(email: string, password: string): Observable<any> {
    const body: AuthPayload = { email: email, password };
    return this.requestService.postUnsecured('/auth/signup', body).pipe(
      tap((_) => this.log(`Signup with email=${email}`)),
      catchError(this.handleError<Auth>('SignUp')),
    );
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
