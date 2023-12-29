import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PizzaOrder } from './pizzaOrder';
import { MessageService } from '../message/message.service';
import { catchError, tap } from 'rxjs/operators';
import { RequestClientService } from '../request-client/request-client.service';

@Injectable({
  providedIn: 'root',
})
export class PizzaOrderService {
  constructor(
    private requestClient: RequestClientService,
    private messageService: MessageService,
  ) {}

  getPizzaOrders(): Observable<PizzaOrder[]> {
    return this.requestClient.get<PizzaOrder[]>('/pizzaorders').pipe(
      tap((_) => this.log('fetched pizza orders')),
      catchError(this.handleError<PizzaOrder[]>('getPizzaOrders', [])),
    );
  }

  getPizzaOrder(id: number): Observable<PizzaOrder> {
    return this.requestClient.get<PizzaOrder>(`/pizzaorders/${id}`).pipe(
      tap((_) => this.log(`fetched pizza order id=${id}`)),
      catchError(this.handleError<PizzaOrder>(`getPizzaOrder id=${id}`)),
    );
  }

  updatePizzaOrder(pizzaOrder: PizzaOrder): Observable<PizzaOrder> {
    return this.requestClient
      .patch<PizzaOrder, any>(`/pizzaorders/${pizzaOrder.id}`, pizzaOrder)
      .pipe(tap((_) => this.log(`Updated pizza order id=${pizzaOrder.id}`)));
  }

  addPizzaOrder(pizzaOrder: PizzaOrder) {
    return this.requestClient
      .post<PizzaOrder, PizzaOrder>('/pizzaorders', pizzaOrder)
      .pipe(
        tap((newPizzaOrder) =>
          this.log(`added pizza order w/ id=${newPizzaOrder.id}`),
        ),
        catchError(this.handleError<PizzaOrder>('addPizzaOrder')),
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
    this.messageService.add(`PizzaOrder: ${message}`);
  }
}
