import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PizzaOrderService } from './pizza-order.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CreatePizzaOrderDto, EditPizzaOrderDto } from './dto';

@UseGuards(JwtGuard)
@Controller('pizzaorders')
export class PizzaOrderController {
  constructor(private pizzaOrderService: PizzaOrderService) {}

  @Get('types')
  getPizzaTypes() {
    return this.pizzaOrderService.getPizzaTypes();
  }

  @Get()
  getPizzaOrders(@GetUser('id') userId: number) {
    return this.pizzaOrderService.getPizzaOrders(userId);
  }

  @Get(':id')
  getPizzaOrderById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) pizzaOrderId: number,
  ) {
    return this.pizzaOrderService.getPizzaOrderById(userId, pizzaOrderId);
  }

  @Post()
  createPizzaOrder(
    @GetUser('id') userId: number,
    @Body() dto: CreatePizzaOrderDto,
  ) {
    return this.pizzaOrderService.createPizzaOrder(userId, dto);
  }

  @Patch(':id')
  editPizzaOrderById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) pizzaOrderId: number,
    @Body() dto: EditPizzaOrderDto,
  ) {
    return this.pizzaOrderService.editPizzaOrderById(userId, pizzaOrderId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePizzaOrderById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) pizzaOrderId: number,
  ) {
    this.pizzaOrderService.deletePizzaOrderById(userId, pizzaOrderId);
  }
}
