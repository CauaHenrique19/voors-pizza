import { Prisma, PrismaClient } from '@prisma/client';
import {
  FindPersonalizationByIdRepository,
  FindPersonalizationsRepository,
} from 'src/data/protocols/db';

export class PersonalizationPrismaRepository
  implements FindPersonalizationsRepository, FindPersonalizationByIdRepository
{
  private personalizationRepository: Prisma.PersonalizationDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.personalizationRepository = prismaClient.personalization;
  }

  find(): Promise<FindPersonalizationsRepository.Result> {
    return this.personalizationRepository.findMany();
  }

  async findById(
    parameters: FindPersonalizationByIdRepository.Parameters,
  ): Promise<FindPersonalizationByIdRepository.Result> {
    if (Array.isArray(parameters.id)) {
      return await this.personalizationRepository.findMany({
        where: { id: { in: parameters.id } },
      });
    }

    return await this.personalizationRepository.findFirst({
      where: { id: parameters.id },
    });
  }
}
