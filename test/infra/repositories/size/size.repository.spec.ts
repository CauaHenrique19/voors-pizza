import { PrismaClient } from '@prisma/client';
import { SizePrismaRepository } from 'src/infra/orm/repositories';

describe('Size Prisma Repository', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const makeSut = (): SizePrismaRepository => {
    return new SizePrismaRepository();
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

    test('Should return an array of sizes', async () => {
      const sut = makeSut();
      const account = await sut.find();

      expect(account).toBeTruthy();
      expect(account.length).toBeGreaterThan(0);
    });
  });
});
