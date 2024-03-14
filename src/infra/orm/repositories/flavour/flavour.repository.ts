import { Prisma, PrismaClient } from '@prisma/client';
import { FindFlavoursRepository } from 'src/data/protocols/db';

export class FlavourPrismaRepository implements FindFlavoursRepository {
  private flavourRepository: Prisma.FlavourDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.flavourRepository = prismaClient.flavour;
  }

  find(): Promise<FindFlavoursRepository.Result> {
    return this.flavourRepository.findMany();
  }
}
