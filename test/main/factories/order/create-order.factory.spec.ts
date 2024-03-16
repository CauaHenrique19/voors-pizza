import { CreateOrderUseCase } from 'src/domain/usecases/order';
import { BuildCreateOrderControllerFactory } from 'src/main/factories/controllers';
import { CreateOrderController } from 'src/presentation/controllers';
import { makeFakeOrder } from 'test/domain/mocks/order/create-order.mock';

const makeCreateOrder = () => {
  class CreateOrderStub implements CreateOrderUseCase {
    async create(): Promise<CreateOrderUseCase.Result> {
      return new Promise((resolve) => resolve(makeFakeOrder()));
    }
  }

  return new CreateOrderStub();
};

export interface sutTypes {
  sut: CreateOrderController;
  createOrderStub: CreateOrderUseCase;
}

const makeSut = (): sutTypes => {
  const createOrderStub = makeCreateOrder();
  const sut = new CreateOrderController(createOrderStub);

  return {
    sut,
    createOrderStub,
  };
};

jest.mock(
  'src/main/factories/controllers/order/create-order-controller.factory.ts',
);

describe('BuildCreateOrderControllerFactory', () => {
  test('Should be able to build the controller correctly', () => {
    const { createOrderStub } = makeSut();
    new BuildCreateOrderControllerFactory(createOrderStub);

    expect(BuildCreateOrderControllerFactory).toHaveBeenCalledWith(
      createOrderStub,
    );
  });
});
