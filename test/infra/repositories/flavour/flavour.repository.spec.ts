import { PrismaClient } from '@prisma/client';
import { FlavourPrismaRepository } from 'src/infra/orm/repositories';
import { FlavourModel } from 'src/domain/models';

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

      const flavours = await sut.find();

      expect(flavours).toBeTruthy();
      expect(flavours.length).toBe(0);
    });

    test('Should return an array of flavours', async () => {
      const sut = makeSut();
      const flavours = await sut.find();

      expect(flavours).toBeTruthy();
      expect(flavours.length).toBeGreaterThan(0);
    });
  });

  describe('findById()', () => {
    test('Should return an array when passed array of ids', async () => {
      const sut = makeSut();

      const flavours = (await sut.findById({
        id: [1, 2, 3],
      })) as FlavourModel[];

      expect(flavours).toBeTruthy();
      expect(flavours.length).toBe(3);
    });

    test('Should return a flavour when passed id', async () => {
      const sut = makeSut();

      const flavours = (await sut.findById({
        id: 1,
      })) as FlavourModel;

      expect(flavours).toBeTruthy();
      expect(flavours.id).toBe(1);
    });
  });
});
