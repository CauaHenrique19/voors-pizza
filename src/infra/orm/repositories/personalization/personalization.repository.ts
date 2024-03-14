import { Prisma, PrismaClient } from '@prisma/client';
import { FindPersonalizationsRepository } from 'src/data/protocols/db';

export class PersonalizationPrismaRepository
  implements FindPersonalizationsRepository
{
  private personalizationRepository: Prisma.PersonalizationDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.personalizationRepository = prismaClient.personalization;
  }

  find(): Promise<FindPersonalizationsRepository.Result> {
    return this.personalizationRepository.findMany();
  }
}
