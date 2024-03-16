import { PrismaClient } from '@prisma/client';
import { PersonalizationPrismaRepository } from 'src/infra/orm/repositories';
import { PersonalizationModel } from 'src/domain/models';

describe('Personalization Prisma Repository', () => {
  const prismaClient = new PrismaClient();

  beforeAll(async () => {
    await prismaClient.$connect();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const makeSut = (): PersonalizationPrismaRepository => {
    return new PersonalizationPrismaRepository();
  };

  describe('find()', () => {
    test('Should return an empty array on database is clear', async () => {
      const sut = makeSut();

      jest
        .spyOn(sut, 'find')
        .mockReturnValueOnce(new Promise((resolve) => resolve([])));

      const personalizations = await sut.find();

      expect(personalizations).toBeTruthy();
      expect(personalizations.length).toBe(0);
    });

    test('Should return an array of personalizations', async () => {
      const sut = makeSut();
      const personalizations = await sut.find();

      expect(personalizations).toBeTruthy();
      expect(personalizations.length).toBeGreaterThan(0);
    });
  });

  describe('findById()', () => {
    test('Should return an array when passed array of ids', async () => {
      const sut = makeSut();

      const personalizations = (await sut.findById({
        id: [1, 2, 3],
      })) as PersonalizationModel[];

      expect(personalizations).toBeTruthy();
      expect(personalizations.length).toBe(3);
    });

    test('Should return a personalization when passed id', async () => {
      const sut = makeSut();

      const personalizations = (await sut.findById({
        id: 1,
      })) as PersonalizationModel;

      expect(personalizations).toBeTruthy();
      expect(personalizations.id).toBe(1);
    });
  });
});
