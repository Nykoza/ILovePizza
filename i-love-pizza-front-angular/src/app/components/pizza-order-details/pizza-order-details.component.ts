import { Component, Input } from '@angular/core';
import { PizzaOrder } from '../../services/pizza-order/pizzaOrder';
import { FormsModule } from '@angular/forms';
import { NgIf, UpperCasePipe } from '@angular/common';
import { PizzaOrderService } from '../../services/pizza-order/pizza-order.service';

@Component({
  selector: 'app-pizza-order-details',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './pizza-order-details.component.html',
  styleUrl: './pizza-order-details.component.css',
})
export class PizzaOrderDetailsComponent {
  constructor(private pizzaOrderService: PizzaOrderService) {}
  @Input() pizzaOrder?: PizzaOrder;

  save(): void {
    if (this.pizzaOrder) {
      this.pizzaOrderService
        .updatePizzaOrder(this.pizzaOrder)
        .subscribe(() => this.goBack());
    }
  }

  goBack() {}
}
