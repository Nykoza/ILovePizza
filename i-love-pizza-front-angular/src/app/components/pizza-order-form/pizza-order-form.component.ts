import { Component } from '@angular/core';
import { PizzaOrderService } from '../../services/pizza-order/pizza-order.service';
import { PizzaOrder } from '../../services/pizza-order/pizzaOrder';

@Component({
  selector: 'app-pizza-order-form',
  standalone: true,
  imports: [],
  templateUrl: './pizza-order-form.component.html',
  styleUrl: './pizza-order-form.component.css',
})
export class PizzaOrderFormComponent {
  private pizzaOrders: PizzaOrder[] = [];

  constructor(private pizzaOrderService: PizzaOrderService) {}

  ngOnInit(): void {
    this.pizzaOrderService
      .getPizzaOrders()
      .subscribe((pizzaOrders) => (this.pizzaOrders = pizzaOrders));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;

    this.pizzaOrderService
      .addPizzaOrder({ name } as PizzaOrder)
      .subscribe((pizzaOrder) => this.pizzaOrders.push(pizzaOrder));
  }
}
