import { FindSizesUseCase } from '/src/domain/usecases';
import { BuildFindSizesControllerFactory } from '/src/main/factories/controllers';
import { FindSizesController } from '/src/presentation/controllers';

const makeFindSizes = () => {
  class FindSizesStub implements FindSizesUseCase {
    async find(): Promise<FindSizesUseCase.Result> {
      return new Promise((resolve) => resolve([]));
    }
  }

  return new FindSizesStub();
};

export interface sutTypes {
  sut: FindSizesController;
  findSizesStub: FindSizesUseCase;
}

const makeSut = (): sutTypes => {
  const findSizesStub = makeFindSizes();
  const sut = new FindSizesController(findSizesStub);

  return {
    sut,
    findSizesStub,
  };
};

jest.mock(
  'src/main/factories/controllers/size/find-sizes-controller.factory.ts',
);

describe('BuildFindSizesControllerFactory', () => {
  test('Should be able to build the controller correctly', () => {
    const { findSizesStub } = makeSut();
    new BuildFindSizesControllerFactory(findSizesStub);

    expect(BuildFindSizesControllerFactory).toHaveBeenCalledWith(findSizesStub);
  });
});
