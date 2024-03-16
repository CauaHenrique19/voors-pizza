import { PrismaClient } from '@prisma/client';
import {
  OrderItemPrismaRepository,
  OrderPrismaRepository,
} from 'src/infra/orm/repositories';

let orderRepository: OrderPrismaRepository;

describe('Order Item Prisma Repository', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.$connect();
  });

  beforeEach(() => {
    orderRepository = new OrderPrismaRepository();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const makeSut = (): OrderItemPrismaRepository => {
    return new OrderItemPrismaRepository();
  };

  describe('create()', () => {
    test('Should return an order item on create success', async () => {
      const sut = makeSut();

      const now = new Date();

      const order = await orderRepository.create({
        createdAt: now,
        total: 5,
        totalPreparationTime: 15,
      });

      const orderItem = await sut.create({
        flavourId: 1,
        orderId: order.id,
        sizeId: 1,
        createdAt: now,
      });

      expect(orderItem).toBeTruthy();
      expect(orderItem.id).toBeTruthy();
      expect(orderItem.flavourId).toBe(1);
      expect(orderItem.sizeId).toBe(1);
      expect(orderItem.orderId).toBe(order.id);
      expect(orderItem.createdAt).toStrictEqual(now);
    });
  });
});
