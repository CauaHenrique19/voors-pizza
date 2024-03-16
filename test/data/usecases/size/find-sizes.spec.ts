import { FindSizesRepository } from 'src/data/protocols/db';
import { FindSizes } from 'src/data/usecases';
import { SizesNotFoundError } from 'src/domain/errors';
import { SizeModel } from 'src/domain/models';

export const makeFakeSizes = (): SizeModel[] => [
  {
    id: 1,
    description: 'Pequena',
    preparationTime: 15,
    value: 20.2,
    createdAt: new Date(),
  },
  {
    id: 2,
    description: 'Média',
    preparationTime: 20,
    value: 30.3,
    createdAt: new Date(),
  },
  {
    id: 3,
    description: 'Grande',
    preparationTime: 25,
    value: 40,
    createdAt: new Date(),
  },
];

const fakeSizes = makeFakeSizes();

const makeFindSizesRepository = (): FindSizesRepository => {
  class FindSizesRepositoryStub implements FindSizesRepository {
    async find(): Promise<FindSizesRepository.Result> {
      return new Promise((resolve, reject) => resolve(fakeSizes));
    }
  }

  return new FindSizesRepositoryStub();
};

export interface SutTypes {
  sut: FindSizes;
  findSizesRepositoryStub: FindSizesRepository;
}

const makeSut = (): SutTypes => {
  const findSizesRepositoryStub = makeFindSizesRepository();
  const sut = new FindSizes(findSizesRepositoryStub);

  return {
    sut,
    findSizesRepositoryStub,
  };
};

describe('FindSizes UseCase', () => {
  test('Should Call FindSizesRepository', async () => {
    const { sut, findSizesRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findSizesRepositoryStub, 'find');

    await sut.find();

    expect(findSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if FindSizesRepository throws', async () => {
    const { sut, findSizesRepositoryStub } = makeSut();
    jest
      .spyOn(findSizesRepositoryStub, 'find')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = sut.find();
    await expect(promise).rejects.toThrow();
  });

  test('Should throws SizesNotFoundError when not found flavors', async () => {
    try {
      const { sut, findSizesRepositoryStub } = makeSut();

      jest
        .spyOn(findSizesRepositoryStub, 'find')
        .mockReturnValueOnce(new Promise((resolve) => resolve([])));

      await sut.find();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(SizesNotFoundError);
    }
  });

  test('Should return sizes on success', async () => {
    const { sut } = makeSut();

    const account = await sut.find();
    expect(account).toEqual(fakeSizes);
  });
});
