import { CreateOrderController } from 'src/presentation/controllers';
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from 'src/presentation/helpers';
import { CreateOrderUseCase } from 'src/domain/usecases/order';
import {
  FlavourNotFoundError,
  PersonalizationNotFoundError,
  RepeatedPersonalizationError,
  SizeNotFoundError,
} from 'src/domain/errors';
import {
  makeFakeItens,
  makeFakeItensWithInvalidFlavour,
  makeFakeItensWithInvalidPersonalization,
  makeFakeItensWithInvalidSize,
  makeFakeItensWithRepeatedPersonalization,
  makeFakeOrder,
} from 'test/domain/mocks/order/create-order.mock';

const fakeOrder = makeFakeOrder();

const makeCreateOrder = () => {
  class CreateOrderStub implements CreateOrderUseCase {
    async create(): Promise<CreateOrderUseCase.Result> {
      return new Promise((resolve) => resolve(fakeOrder));
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

describe('Create Order Controller', () => {
  test('Should call create order use case', async () => {
    const { sut, createOrderStub } = makeSut();
    const finPersonalizationsSpy = jest.spyOn(createOrderStub, 'create');

    const itens = makeFakeItens();
    await sut.handle(itens);
    expect(finPersonalizationsSpy).toHaveBeenCalled();
    expect(finPersonalizationsSpy).toHaveBeenCalledTimes(1);
  });

  test('Should return 200 if order has been created', async () => {
    const { sut } = makeSut();
    const itens = makeFakeItens();
    const httpResponse = await sut.handle(itens);

    expect(httpResponse).toEqual(ok(fakeOrder));
  });

  test('Should return 404 if not found size', async () => {
    const { sut, createOrderStub } = makeSut();

    const error = new SizeNotFoundError();
    jest.spyOn(createOrderStub, 'create').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle(makeFakeItensWithInvalidSize());
    expect(httpResponse).toEqual(notFound(error));
  });

  test('Should return 404 if not found flavour', async () => {
    const { sut, createOrderStub } = makeSut();

    const error = new FlavourNotFoundError();
    jest.spyOn(createOrderStub, 'create').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle(makeFakeItensWithInvalidSize());
    expect(httpResponse).toEqual(notFound(error));
  });

  test('Should return 404 if not found flavour', async () => {
    const { sut, createOrderStub } = makeSut();

    const error = new FlavourNotFoundError();
    jest.spyOn(createOrderStub, 'create').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle(makeFakeItensWithInvalidFlavour());
    expect(httpResponse).toEqual(notFound(error));
  });

  test('Should return 404 if not found personalization', async () => {
    const { sut, createOrderStub } = makeSut();

    const error = new PersonalizationNotFoundError();
    jest.spyOn(createOrderStub, 'create').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle(
      makeFakeItensWithInvalidPersonalization(),
    );
    expect(httpResponse).toEqual(notFound(error));
  });

  test('Should return 404 if have repeated personalization', async () => {
    const { sut, createOrderStub } = makeSut();

    const error = new RepeatedPersonalizationError();
    jest.spyOn(createOrderStub, 'create').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle(
      makeFakeItensWithRepeatedPersonalization(),
    );
    expect(httpResponse).toEqual(badRequest(error));
  });

  test('Should return 500 if create order throws', async () => {
    const { sut, createOrderStub } = makeSut();
    jest.spyOn(createOrderStub, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeItens());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
