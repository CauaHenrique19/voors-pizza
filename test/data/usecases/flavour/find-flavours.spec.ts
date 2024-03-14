import { FindFlavoursRepository } from 'src/data/protocols/db';
import { FindFlavours } from 'src/data/usecases';
import { FlavourModel } from 'src/domain/models';

export const makeFakeFlavours = (): FlavourModel[] => [
  {
    id: 1,
    description: 'Calabresa',
    createdAt: new Date(),
  },
  {
    id: 1,
    description: 'Marguerita',
    createdAt: new Date(),
  },
  {
    id: 1,
    description: 'Portuguesa',
    adittionalPreparationTime: 5,
    createdAt: new Date(),
  },
];

const fakeFlavours = makeFakeFlavours();

const makeFindFlavoursRepository = (): FindFlavoursRepository => {
  class FindFlavoursRepositoryStub implements FindFlavoursRepository {
    async find(): Promise<FindFlavoursRepository.Result> {
      return new Promise((resolve, reject) => resolve(fakeFlavours));
    }
  }

  return new FindFlavoursRepositoryStub();
};

export interface SutTypes {
  sut: FindFlavours;
  findFlavoursRepositoryStub: FindFlavoursRepository;
}

const makeSut = (): SutTypes => {
  const findFlavoursRepositoryStub = makeFindFlavoursRepository();
  const sut = new FindFlavours(findFlavoursRepositoryStub);

  return {
    sut,
    findFlavoursRepositoryStub,
  };
};

describe('FindFlavours UseCase', () => {
  test('Should Call FindFlavoursRepository', async () => {
    const { sut, findFlavoursRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findFlavoursRepositoryStub, 'find');

    await sut.find();

    expect(findSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if FindFlavoursRepository throws', async () => {
    const { sut, findFlavoursRepositoryStub } = makeSut();
    jest
      .spyOn(findFlavoursRepositoryStub, 'find')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = sut.find();
    await expect(promise).rejects.toThrow();
  });

  test('Should return flavours on success', async () => {
    const { sut } = makeSut();

    const account = await sut.find();
    expect(account).toEqual(fakeFlavours);
  });
});
