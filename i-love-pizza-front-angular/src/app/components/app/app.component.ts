import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessagesComponent } from '../messages/messages.component';
import { PizzaOrdersComponent } from '../pizza-orders/pizza-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { PizzaOrderFormComponent } from '../pizza-order-form/pizza-order-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PizzaOrdersComponent,
    PizzaOrderFormComponent,
    MessagesComponent,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ILovePizza';
}
