import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PizzaName } from '@prisma/client';

export class EditPizzaOrderDto {
  @IsOptional()
  @IsEnum(PizzaName)
  name?: PizzaName;

  @IsString()
  @IsOptional()
  extra?: string;
}
