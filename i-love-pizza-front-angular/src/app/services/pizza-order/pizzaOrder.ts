export interface PizzaOrder {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  extra?: string;
  userId: number;
}
