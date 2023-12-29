import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { PizzaOrderService } from '../../services/pizza-order/pizza-order.service';
import { MessageService } from '../../services/message/message.service';
import { PizzaOrder } from '../../services/pizza-order/pizzaOrder';
import { PizzaOrderDetailsComponent } from '../pizza-order-details/pizza-order-details.component';

@Component({
  selector: 'app-pizza-orders',
  standalone: true,
  imports: [NgForOf, PizzaOrderDetailsComponent],
  templateUrl: './pizza-orders.component.html',
  styleUrl: './pizza-orders.component.css',
})
export class PizzaOrdersComponent {
  constructor(
    private pizzaOrderService: PizzaOrderService,
    private messageService: MessageService,
  ) {}

  pizzaOrders: PizzaOrder[] = [];
  selectedPizzaOrder?: PizzaOrder;

  ngOnInit(): void {
    this.getPizzaOrders();
  }

  onSelect(pizzaOrder: PizzaOrder): void {
    this.selectedPizzaOrder = pizzaOrder;
    this.messageService.add(
      `PizzaOrdersComponent: Selected pizza order name=${pizzaOrder.name}`,
    );
  }

  getPizzaOrders(): void {
    this.pizzaOrderService
      .getPizzaOrders()
      .subscribe(
        (pizzaOrders: PizzaOrder[]) => (this.pizzaOrders = pizzaOrders),
      );
  }
}
