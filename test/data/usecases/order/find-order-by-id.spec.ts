import { FindOrderByIdRepository } from 'src/data/protocols/db';
import { FindOrderById } from 'src/data/usecases';
import { OrderNotFoundError } from 'src/domain/errors';
import { FindOrderByIdUseCase } from 'src/domain/usecases';
import { makeFakeFullOrder } from 'test/domain/mocks/order/find-order.mock';

const fakeOrder = makeFakeFullOrder();

const makeFindOrderByIdRepository = (): FindOrderByIdRepository => {
  class FindOrderByIdRepositoryStub implements FindOrderByIdRepository {
    async find(): Promise<FindOrderByIdRepository.Result> {
      return new Promise((resolve) => resolve(fakeOrder));
    }
  }

  return new FindOrderByIdRepositoryStub();
};

export interface SutTypes {
  sut: FindOrderByIdUseCase;
  findOrderByIdRepository: FindOrderByIdRepository;
}

const makeSut = (): SutTypes => {
  const findOrderByIdRepository = makeFindOrderByIdRepository();

  const sut = new FindOrderById(findOrderByIdRepository);

  return {
    sut,
    findOrderByIdRepository,
  };
};

describe('FindOrderById UseCase', () => {
  test('Should Call FindOrderByIdRepository 1 time', async () => {
    const { sut, findOrderByIdRepository } = makeSut();
    const findSpy = jest.spyOn(findOrderByIdRepository, 'find');

    await sut.find({ id: 1 });

    expect(findSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throws OrderNotFoundError when invalid id', async () => {
    try {
      const { sut } = makeSut();
      await sut.find({ id: 999999999999999999 });
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(OrderNotFoundError);
    }
  });

  test('Should Call order on success', async () => {
    const { sut } = makeSut();
    const order = await sut.find({ id: 1 });

    expect(order).toBe(order);
  });
});
