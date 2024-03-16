import { FindPersonalizationsRepository } from 'src/data/protocols/db';
import { FindPersonalizations } from 'src/data/usecases';
import { PersonalizationModel } from 'src/domain/models';

export const makeFakePersonalizations = (): PersonalizationModel[] => [
  {
    id: 1,
    description: 'Extra Bacon',
    value: 3,
    createdAt: new Date(),
  },
  {
    id: 2,
    description: 'Sem Cebola',
    createdAt: new Date(),
  },
  {
    id: 3,
    description: 'Borda Recheada',
    adittionalPreparationTime: 5,
    value: 5,
    createdAt: new Date(),
  },
];

const fakePersonalizations = makeFakePersonalizations();

const makeFindPersonalizationsRepository =
  (): FindPersonalizationsRepository => {
    class FindPersonalizationsRepositoryStub
      implements FindPersonalizationsRepository
    {
      async find(): Promise<FindPersonalizationsRepository.Result> {
        return new Promise((resolve, reject) => resolve(fakePersonalizations));
      }
    }

    return new FindPersonalizationsRepositoryStub();
  };

export interface SutTypes {
  sut: FindPersonalizations;
  findPersonalizationsRepositoryStub: FindPersonalizationsRepository;
}

const makeSut = (): SutTypes => {
  const findPersonalizationsRepositoryStub =
    makeFindPersonalizationsRepository();
  const sut = new FindPersonalizations(findPersonalizationsRepositoryStub);

  return {
    sut,
    findPersonalizationsRepositoryStub,
  };
};

describe('FindPersonalizations UseCase', () => {
  test('Should Call FindPersonalizationsRepository', async () => {
    const { sut, findPersonalizationsRepositoryStub } = makeSut();

    const findSpy = jest.spyOn(findPersonalizationsRepositoryStub, 'find');

    await sut.find();

    expect(findSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throw if FindPersonalizationsRepository throws', async () => {
    const { sut, findPersonalizationsRepositoryStub } = makeSut();
    jest
      .spyOn(findPersonalizationsRepositoryStub, 'find')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = sut.find();
    await expect(promise).rejects.toThrow();
  });

  test('Should return personalizations on success', async () => {
    const { sut } = makeSut();

    const account = await sut.find();
    expect(account).toEqual(fakePersonalizations);
  });
});
