import { Prisma, PrismaClient } from '@prisma/client';
import {
  FindSizeByIdRepository,
  FindSizesRepository,
} from 'src/data/protocols/db';

export class SizePrismaRepository
  implements FindSizesRepository, FindSizeByIdRepository
{
  private sizeRepository: Prisma.SizeDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.sizeRepository = prismaClient.size;
  }

  find(): Promise<FindSizesRepository.Result> {
    return this.sizeRepository.findMany();
  }

  async findById(
    parameters: FindSizeByIdRepository.Parameters,
  ): Promise<FindSizeByIdRepository.Result> {
    if (Array.isArray(parameters.id)) {
      return await this.sizeRepository.findMany({
        where: { id: { in: parameters.id } },
      });
    }

    return await this.sizeRepository.findFirst({
      where: { id: parameters.id },
    });
  }
}
