import { Prisma, PrismaClient } from '@prisma/client';
import { FindSizesRepository } from 'src/data/protocols/db';

export class SizePrismaRepository implements FindSizesRepository {
  private sizeRepository: Prisma.SizeDelegate;

  constructor() {
    const prismaClient = new PrismaClient();
    this.sizeRepository = prismaClient.size;
  }

  find(): Promise<FindSizesRepository.Result> {
    return this.sizeRepository.findMany();
  }
}
