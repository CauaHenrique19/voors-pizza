import { FindFlavoursUseCase } from '/src/domain/usecases';
import { BuildFindFlavoursControllerFactory } from '/src/main/factories/controllers';
import { FindFlavoursController } from '/src/presentation/controllers';

const makeFindFlavours = () => {
  class FindFlavoursStub implements FindFlavoursUseCase {
    async find(): Promise<FindFlavoursUseCase.Result> {
      return new Promise((resolve) => resolve([]));
    }
  }

  return new FindFlavoursStub();
};

export interface sutTypes {
  sut: FindFlavoursController;
  findFlavoursStub: FindFlavoursUseCase;
}

const makeSut = (): sutTypes => {
  const findFlavoursStub = makeFindFlavours();
  const sut = new FindFlavoursController(findFlavoursStub);

  return {
    sut,
    findFlavoursStub,
  };
};

jest.mock(
  'src/main/factories/controllers/flavour/find-flavours-controller.factory.ts',
);

describe('BuildFindFlavoursControllerFactory', () => {
  test('Should be able to build the controller correctly', () => {
    const { findFlavoursStub } = makeSut();
    new BuildFindFlavoursControllerFactory(findFlavoursStub);

    expect(BuildFindFlavoursControllerFactory).toHaveBeenCalledWith(
      findFlavoursStub,
    );
  });
});
