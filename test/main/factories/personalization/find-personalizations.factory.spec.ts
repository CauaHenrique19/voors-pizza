import { FindPersonalizationsUseCase } from 'src/domain/usecases';
import { BuildFindPersonalizationsControllerFactory } from 'src/main/factories/controllers';
import { FindPersonalizationsController } from 'src/presentation/controllers';

const makeFindPersonalizations = () => {
  class FindPersonalizationsStub implements FindPersonalizationsUseCase {
    async find(): Promise<FindPersonalizationsUseCase.Result> {
      return new Promise((resolve) => resolve([]));
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

jest.mock(
  'src/main/factories/controllers/personalization/find-personalizations-controller.factory.ts',
);

describe('BuildFindPersonalizationsControllerFactory', () => {
  test('Should be able to build the controller correctly', () => {
    const { findPersonalizationsStub } = makeSut();
    new BuildFindPersonalizationsControllerFactory(findPersonalizationsStub);

    expect(BuildFindPersonalizationsControllerFactory).toHaveBeenCalledWith(
      findPersonalizationsStub,
    );
  });
});
