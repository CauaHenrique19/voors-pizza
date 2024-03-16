import { Prisma, PrismaClient } from '@prisma/client';
import { CreateOrderItemRepository } from 'src/data/protocols/db';

export class OrderItemPrismaRepository implements CreateOrderItemRepository {
  private orderItemRepository: Prisma.OrderItemDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.orderItemRepository = prismaClient.orderItem;
  }

  async create(
    parameters: CreateOrderItemRepository.Parameters,
    transaction?: Prisma.TransactionClient,
  ): Promise<CreateOrderItemRepository.Result> {
    const client = transaction
      ? transaction.orderItem
      : this.orderItemRepository;
    return await client.create({ data: parameters });
  }
}
