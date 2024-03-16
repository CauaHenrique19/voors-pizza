import { Prisma, PrismaClient } from '@prisma/client';
import { CreatePersonalizationOrderItemRepository } from 'src/data/protocols/db';

export class PersonalizationOrderItemPrismaRepository
  implements CreatePersonalizationOrderItemRepository
{
  private personalizationOrderItemRepository: Prisma.PersonalizationOrderItemDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.personalizationOrderItemRepository =
      prismaClient.personalizationOrderItem;
  }

  async create(
    parameters: CreatePersonalizationOrderItemRepository.Parameters,
    transaction?: Prisma.TransactionClient,
  ): Promise<CreatePersonalizationOrderItemRepository.Result> {
    const client = transaction
      ? transaction.personalizationOrderItem
      : this.personalizationOrderItemRepository;
    await client.createMany({
      data: parameters,
    });
  }
}
