import { Prisma, PrismaClient } from '@prisma/client';
import {
  FindFlavourByIdRepository,
  FindFlavoursRepository,
} from 'src/data/protocols/db';

export class FlavourPrismaRepository
  implements FindFlavoursRepository, FindFlavourByIdRepository
{
  private flavourRepository: Prisma.FlavourDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.flavourRepository = prismaClient.flavour;
  }

  find(): Promise<FindFlavoursRepository.Result> {
    return this.flavourRepository.findMany();
  }

  async findById(
    parameters: FindFlavourByIdRepository.Parameters,
  ): Promise<FindFlavourByIdRepository.Result> {
    if (Array.isArray(parameters.id)) {
      return await this.flavourRepository.findMany({
        where: { id: { in: parameters.id } },
      });
    }

    return await this.flavourRepository.findFirst({
      where: { id: parameters.id },
    });
  }
}
