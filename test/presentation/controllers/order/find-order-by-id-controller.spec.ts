import { FindOrderByIdController } from 'src/presentation/controllers';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { FindOrderByIdUseCase } from 'src/domain/usecases/order';
import { OrderNotFoundError } from 'src/domain/errors';
import { makeFakeFullOrder } from 'test/domain/mocks/order/find-order.mock';

const fakeOrder = makeFakeFullOrder();

const makeFindOrderById = () => {
  class FindOrderByIdStub implements FindOrderByIdUseCase {
    async find(): Promise<FindOrderByIdUseCase.Result> {
      return new Promise((resolve) => resolve(fakeOrder));
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

describe('Find Order By Id Controller', () => {
  test('Should call create order use case', async () => {
    const { sut, findOrderByIdStub } = makeSut();
    const finPersonalizationsSpy = jest.spyOn(findOrderByIdStub, 'find');

    await sut.handle({ id: 1 });
    expect(finPersonalizationsSpy).toHaveBeenCalled();
    expect(finPersonalizationsSpy).toHaveBeenCalledTimes(1);
  });

  test('Should return 200 if order has been created', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ id: 1 });

    expect(httpResponse).toEqual(ok(fakeOrder));
  });

  test('Should return 404 if not found order', async () => {
    const { sut, findOrderByIdStub } = makeSut();

    const error = new OrderNotFoundError();
    jest.spyOn(findOrderByIdStub, 'find').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle({ id: 99999999999 });
    expect(httpResponse).toEqual(notFound(error));
  });

  test('Should return 500 if create order throws', async () => {
    const { sut, findOrderByIdStub } = makeSut();
    jest.spyOn(findOrderByIdStub, 'find').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle({ id: 1 });
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
