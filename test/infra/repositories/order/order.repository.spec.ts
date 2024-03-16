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
      const order = await sut.create({
        createdAt: now,
        total: 5,
        totalPreparationTime: 15,
      });

      expect(order).toBeTruthy();
      expect(order.id).toBeTruthy();
      expect(order.createdAt).toStrictEqual(now);
      expect(order.total).toBe(5);
      expect(order.totalPreparationTime).toBe(15);
    });
  });

  describe('find()', () => {
    test('Should return an order on find success', async () => {
      const sut = makeSut();
      const order = await sut.find({ id: 1 });

      expect(order.id).toBe(1);
    });
  });
});
