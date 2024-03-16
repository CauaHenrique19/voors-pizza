import { FindOrderByIdUseCase } from 'src/domain/usecases';
import { BuildFindOrderByIdControllerFactory } from 'src/main/factories/controllers';
import { FindOrderByIdController } from 'src/presentation/controllers';
import { makeFakeFullOrder } from 'test/domain/mocks/order/find-order.mock';

const makeFindOrderById = () => {
  class FindOrderByIdStub implements FindOrderByIdUseCase {
    async find(): Promise<FindOrderByIdUseCase.Result> {
      return new Promise((resolve) => resolve(makeFakeFullOrder()));
    }
  }

  return new FindOrderByIdStub();
};

export interface sutTypes {
  sut: FindOrderByIdController;
  findOrderByIdStub: FindOrderByIdUseCase;
}

const makeSut = (): sutTypes => {
  const findOrderByIdStub = makeFindOrderById();
  const sut = new FindOrderByIdController(findOrderByIdStub);

  return {
    sut,
    findOrderByIdStub,
  };
};

jest.mock(
  'src/main/factories/controllers/order/find-order-by-id-controller.factory.ts',
);

describe('BuildFindOrderByIdControllerFactory', () => {
  test('Should be able to build the controller correctly', () => {
    const { findOrderByIdStub } = makeSut();
    new BuildFindOrderByIdControllerFactory(findOrderByIdStub);

    expect(BuildFindOrderByIdControllerFactory).toHaveBeenCalledWith(
      findOrderByIdStub,
    );
  });
});
