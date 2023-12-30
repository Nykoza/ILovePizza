import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PizzaOrdersComponent } from './components/pizza-orders/pizza-orders.component';
import { PizzaOrderFormComponent } from './components/pizza-order-form/pizza-order-form.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { inject } from '@angular/core';
import { IsSignedInGuard } from './guard/is-signed-in.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [() => inject(IsSignedInGuard).canActivate()],
  },
  {
    path: 'pizza-orders',
    component: PizzaOrdersComponent,
    canActivate: [() => inject(IsSignedInGuard).canActivate()],
  },
  {
    path: 'pizza-order-form',
    component: PizzaOrderFormComponent,
    canActivate: [() => inject(IsSignedInGuard).canActivate()],
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
];
