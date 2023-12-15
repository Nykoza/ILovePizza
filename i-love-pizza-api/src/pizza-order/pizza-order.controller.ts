import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PizzaOrderService } from './pizza-order.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { CreatePizzaOrderDto } from './dto/create-pizza-order.dto';

@UseGuards(JwtGuard)
@Controller('pizzaorder')
export class PizzaOrderController {
  constructor(private pizzaOrderService: PizzaOrderService) {}

  @Post()
  createPizzaOrder(@GetUser() user: User, @Body() dto: CreatePizzaOrderDto) {
    return this.pizzaOrderService.createPizzaOrder(user, dto);
  }
}
