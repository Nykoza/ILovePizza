import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PizzaName } from '@prisma/client';

export class CreatePizzaOrderDto {
  @IsNotEmpty()
  @IsEnum(PizzaName)
  name: PizzaName;

  @IsString()
  @IsOptional()
  extra: string;
}
