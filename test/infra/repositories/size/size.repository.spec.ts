import { PrismaClient } from '@prisma/client';
import { SizePrismaRepository } from 'src/infra/orm/repositories';
import { SizeModel } from 'src/domain/models';

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

      const sizes = await sut.find();

      expect(sizes).toBeTruthy();
      expect(sizes.length).toBe(0);
    });

    test('Should return an array of sizes', async () => {
      const sut = makeSut();
      const sizes = await sut.find();

      expect(sizes).toBeTruthy();
      expect(sizes.length).toBeGreaterThan(0);
    });
  });

  describe('findById()', () => {
    test('Should return an array when passed array of ids', async () => {
      const sut = makeSut();

      const sizes = (await sut.findById({
        id: [1, 2, 3],
      })) as SizeModel[];

      expect(sizes).toBeTruthy();
      expect(sizes.length).toBe(3);
    });

    test('Should return a size when passed id', async () => {
      const sut = makeSut();

      const sizes = (await sut.findById({
        id: 1,
      })) as SizeModel;

      expect(sizes).toBeTruthy();
      expect(sizes.id).toBe(1);
    });
  });
});
