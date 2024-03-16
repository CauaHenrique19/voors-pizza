import { PrismaClient } from '@prisma/client';
import {
  OrderItemPrismaRepository,
  OrderPrismaRepository,
  PersonalizationOrderItemPrismaRepository,
} from 'src/infra/orm/repositories';

let orderRepository: OrderPrismaRepository;
let orderItemRepository: OrderItemPrismaRepository;

describe('Personalization Order Item Prisma Repository', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.$connect();
  });

  beforeEach(() => {
    orderRepository = new OrderPrismaRepository();
    orderItemRepository = new OrderItemPrismaRepository();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const makeSut = (): PersonalizationOrderItemPrismaRepository => {
    return new PersonalizationOrderItemPrismaRepository();
  };

  describe('create()', () => {
    test('Should return an array of personalizations', async () => {
      const sut = makeSut();

      const now = new Date();
      const order = await orderRepository.create({
        createdAt: now,
        total: 5,
        totalPreparationTime: 15,
      });

      const orderItem = await orderItemRepository.create({
        flavourId: 1,
        orderId: order.id,
        sizeId: 1,
        createdAt: now,
      });

      const spy = jest.spyOn(sut, 'create');

      await sut.create([
        {
          orderItemId: orderItem.id,
          personalizationId: 1,
          createdAt: now,
        },
      ]);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([
        {
          orderItemId: orderItem.id,
          personalizationId: 1,
          createdAt: now,
        },
      ]);
    });
  });
});
