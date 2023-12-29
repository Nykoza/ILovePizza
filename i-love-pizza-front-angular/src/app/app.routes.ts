import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PizzaOrdersComponent } from './components/pizza-orders/pizza-orders.component';
import { PizzaOrderFormComponent } from './components/pizza-order-form/pizza-order-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pizza-orders', component: PizzaOrdersComponent },
  { path: 'pizza-order-form', component: PizzaOrderFormComponent },
];
