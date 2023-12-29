import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { PizzaOrder } from '../../services/pizza-order/pizzaOrder';
import { PizzaOrderService } from '../../services/pizza-order/pizza-order.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [NgForOf],
})
export class DashboardComponent {
  pizzaOrders: PizzaOrder[] = [];

  constructor(private heroService: PizzaOrderService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getPizzaOrders()
      .subscribe((pizzaOrders) => (this.pizzaOrders = pizzaOrders.slice(1, 5)));
  }
}
