import { FindPersonalizationsUseCase } from 'src/domain/usecases';
import { makeFakePersonalizations } from 'test/data/usecases/personalization/find-personalizations.spec';
import { FindPersonalizationsController } from 'src/presentation/controllers';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { PersonalizationsNotFoundError } from 'src/domain/errors';

const fakePersonalizations = makeFakePersonalizations();

const makeFindPersonalizations = () => {
  class FindPersonalizationsStub implements FindPersonalizationsUseCase {
    async find(): Promise<FindPersonalizationsUseCase.Result> {
      return new Promise((resolve) => resolve(fakePersonalizations));
    }
  }

  return new FindPersonalizationsStub();
};

export interface sutTypes {
  sut: FindPersonalizationsController;
  findPersonalizationsStub: FindPersonalizationsUseCase;
}

const makeSut = (): sutTypes => {
  const findPersonalizationsStub = makeFindPersonalizations();
  const sut = new FindPersonalizationsController(findPersonalizationsStub);

  return {
    sut,
    findPersonalizationsStub,
  };
};

describe('Find Personalizations Controller', () => {
  test('Should call find personalization use case', async () => {
    const { sut, findPersonalizationsStub } = makeSut();
    const finPersonalizationsSpy = jest.spyOn(findPersonalizationsStub, 'find');

    await sut.handle();
    expect(finPersonalizationsSpy).toHaveBeenCalledWith();
  });

  test('Should return 200 if personalizations has been returned', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(fakePersonalizations));
  });

  test('Should return 404 if not found personalizations', async () => {
    const { sut, findPersonalizationsStub } = makeSut();

    const error = new PersonalizationsNotFoundError();
    jest.spyOn(findPersonalizationsStub, 'find').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(notFound(error));
  });

  test('Should return 500 if authentication throws', async () => {
    const { sut, findPersonalizationsStub } = makeSut();
    jest.spyOn(findPersonalizationsStub, 'find').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
