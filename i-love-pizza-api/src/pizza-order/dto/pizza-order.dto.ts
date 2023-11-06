import { IsNotEmpty } from 'class-validator';

export class PizzaOrderDto {
  @IsNotEmpty()
  type: string;
}
