import { PrismaClient } from '@prisma/client';
import { FlavourPrismaRepository } from 'src/infra/orm/repositories';

describe('Flavour Prisma Repository', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const makeSut = (): FlavourPrismaRepository => {
    return new FlavourPrismaRepository();
  };

  describe('find()', () => {
    test('Should return an empty array on database is clear', async () => {
      const sut = makeSut();

      jest
        .spyOn(sut, 'find')
        .mockReturnValueOnce(new Promise((resolve) => resolve([])));

      const account = await sut.find();

      expect(account).toBeTruthy();
      expect(account.length).toBe(0);
    });

    test('Should return an array of flavours', async () => {
      const sut = makeSut();
      const account = await sut.find();

      expect(account).toBeTruthy();
      expect(account.length).toBeGreaterThan(0);
    });
  });
});
