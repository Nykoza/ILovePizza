import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePizzaOrderDto } from './dto/create-pizza-order.dto';
import { User } from '@prisma/client';

@Injectable()
export class PizzaOrderService {
  constructor(private prisma: PrismaService) {}

  async createPizzaOrder(user: User, dto: CreatePizzaOrderDto) {
    const pizzaOrder = await this.prisma.pizzaOrder.create({
      data: { name: dto.name, extra: dto.extra, user: user, userId: user.id },
    });

    return pizzaOrder;
  }
}
