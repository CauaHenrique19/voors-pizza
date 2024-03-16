import { Prisma, PrismaClient } from '@prisma/client';
import { CreateOrderRepository } from 'src/data/protocols/db';

export class OrderPrismaRepository implements CreateOrderRepository {
  private orderRepository: Prisma.OrderDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.orderRepository = prismaClient.order;
  }

  async create(
    parameters: CreateOrderRepository.Parameters,
    transaction?: Prisma.TransactionClient,
  ): Promise<CreateOrderRepository.Result> {
    const client = transaction ? transaction.order : this.orderRepository;
    return await client.create({ data: parameters });
  }
}
