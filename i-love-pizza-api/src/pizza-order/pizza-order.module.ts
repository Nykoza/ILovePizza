import { Module } from '@nestjs/common';
import { PizzaOrderController } from './pizza-order.controller';
import { PizzaOrderService } from './pizza-order.service';

@Module({
  controllers: [PizzaOrderController],
  providers: [PizzaOrderService],
})
export class PizzaOrderModule {}
