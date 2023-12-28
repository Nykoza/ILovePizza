import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditPizzaOrderDto, CreatePizzaOrderDto } from './dto';
import { PizzaName } from '@prisma/client';

@Injectable()
export class PizzaOrderService {
  constructor(private prisma: PrismaService) {}

  getPizzaTypes() {
    return Object.values(PizzaName);
  }

  getPizzaOrders(userId: number) {
    return this.prisma.pizzaOrder.findMany({ where: { userId } });
  }

  async getPizzaOrderById(userId: number, pizzaOrderId: number) {
    const pizzaOrder = await this.prisma.pizzaOrder.findFirst({
      where: { id: pizzaOrderId, userId: userId },
    });

    if (!pizzaOrder) {
      throw new NotFoundException("Specified resource doesn't exist");
    }

    return pizzaOrder;
  }

  async createPizzaOrder(userId: number, dto: CreatePizzaOrderDto) {
    return await this.prisma.pizzaOrder.create({
      data: { name: dto.name, extra: dto.extra, userId: userId },
    });
  }

  async editPizzaOrderById(
    userId: number,
    pizzaOrderId: number,
    dto: EditPizzaOrderDto,
  ) {
    const pizzaOrder = await this.prisma.pizzaOrder.findUnique({
      where: { id: pizzaOrderId },
    });

    if (!pizzaOrder) {
      throw new NotFoundException("Specified resource doesn't exist");
    }
    if (pizzaOrder.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.pizzaOrder.update({
      where: { id: pizzaOrderId },
      data: { ...dto },
    });
  }

  async deletePizzaOrderById(userId: number, pizzaOrderId: number) {
    const pizzaOrder = await this.prisma.pizzaOrder.findUnique({
      where: { id: pizzaOrderId },
    });

    if (!pizzaOrder || pizzaOrder.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    await this.prisma.pizzaOrder.delete({ where: { id: pizzaOrderId } });
  }
}
