import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreateOrderRepository,
  FindOrderByIdRepository,
} from 'src/data/protocols/db';

export class OrderPrismaRepository
  implements CreateOrderRepository, FindOrderByIdRepository
{
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

  async find(
    parameters: FindOrderByIdRepository.Parameters,
  ): Promise<FindOrderByIdRepository.Result> {
    return await this.orderRepository.findFirst({
      where: { id: parameters.id },
      select: {
        id: true,
        total: true,
        totalPreparationTime: true,
        createdAt: true,
        itens: {
          select: {
            id: true,
            orderId: true,
            sizeId: true,
            flavourId: true,
            createdAt: true,
            size: {
              select: {
                id: true,
                description: true,
                preparationTime: true,
                value: true,
                createdAt: true,
              },
            },
            flavour: {
              select: {
                id: true,
                description: true,
                adittionalPreparationTime: true,
                createdAt: true,
              },
            },
            personalizations: {
              select: {
                id: true,
                createdAt: true,
                orderItemId: true,
                personalizationId: true,
                personalization: {
                  select: {
                    id: true,
                    description: true,
                    value: true,
                    adittionalPreparationTime: true,
                    createdAt: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
