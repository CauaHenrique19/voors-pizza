import { Prisma, PrismaClient } from '@prisma/client';
import { TransactionManager } from 'src/data/protocols/transaction-manager';

export class PrismaTransactionManager implements TransactionManager {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async handleTransaction<T>(cb: (transaction: Prisma.TransactionClient) => T): Promise<T> {
    const result = await this.prismaClient.$transaction(async (trx) => cb(trx));
    return result;
  }
}
