import { PrismaClient } from '@prisma/client';
import { OrderPrismaRepository } from 'src/infra/orm/repositories';

describe('Order Prisma Repository', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const makeSut = (): OrderPrismaRepository => {
    return new OrderPrismaRepository();
  };

  describe('create()', () => {
    test('Should return an order on create success', async () => {
      const sut = makeSut();

      const now = new Date();
      const account = await sut.create({
        createdAt: now,
        total: 5,
        totalPreparationTime: 15,
      });

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.createdAt).toStrictEqual(now);
      expect(account.total).toBe(5);
      expect(account.totalPreparationTime).toBe(15);
    });
  });
});
