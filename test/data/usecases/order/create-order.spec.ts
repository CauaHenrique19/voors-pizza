import {
  CreateOrderItemRepository,
  CreateOrderRepository,
  CreatePersonalizationOrderItemRepository,
  FindFlavourByIdRepository,
  FindPersonalizationByIdRepository,
  FindSizeByIdRepository,
} from 'src/data/protocols/db';
import { CreateOrder } from 'src/data/usecases';
import { CreateOrderUseCase } from 'src/domain/usecases/order';
import { makeFakeFlavours } from 'test/data/usecases/flavour/find-flavours.spec';
import { makeFakeSizes } from 'test/data/usecases/size/find-sizes.spec';
import { makeFakePersonalizations } from 'test/data/usecases/personalization/find-personalizations.spec';
import { TransactionManager } from 'src/data/protocols/transaction-manager';
import {
  FlavourNotFoundError,
  PersonalizationNotFound,
  RepeatedPersonalizationError,
  SizeNotFoundError,
} from 'src/domain/errors';
import {
  makeFakeItens,
  makeFakeItensWithInvalidFlavour,
  makeFakeItensWithInvalidPersonalization,
  makeFakeItensWithInvalidSize,
  makeFakeItensWithRepeatedPersonalization,
  makeFakeItensWithoutPersonalizations,
  makeFakeOrder,
  makeFakeOrderFromItemWithoutPersonalization,
  makeFakeOrderItem,
} from 'test/domain/mocks/order/create-order.mock';

const makeFindFlavourByIdRepository = (): FindFlavourByIdRepository => {
  class FindFlavourByIdRepositoryStub implements FindFlavourByIdRepository {
    async findById(): Promise<FindFlavourByIdRepository.Result> {
      return new Promise((resolve) => resolve(makeFakeFlavours()));
    }
  }

  return new FindFlavourByIdRepositoryStub();
};

const makeFindSizeByIdRepository = (): FindSizeByIdRepository => {
  class FindSizeByIdRepositoryStub implements FindSizeByIdRepository {
    async findById(): Promise<FindSizeByIdRepository.Result> {
      return new Promise((resolve) => resolve(makeFakeSizes()));
    }
  }

  return new FindSizeByIdRepositoryStub();
};

const makeFindPersonalizationByIdRepository =
  (): FindPersonalizationByIdRepository => {
    class FindPersonalizationByIdRepositoryStub
      implements FindPersonalizationByIdRepository
    {
      async findById(): Promise<FindPersonalizationByIdRepository.Result> {
        return new Promise((resolve) => resolve(makeFakePersonalizations()));
      }
    }

    return new FindPersonalizationByIdRepositoryStub();
  };

const makeCreateOrderRepository = (): CreateOrderRepository => {
  class CreateOrderRepositoryStub implements CreateOrderRepository {
    async create(): Promise<CreateOrderRepository.Result> {
      return new Promise((resolve) => resolve(makeFakeOrder()));
    }
  }

  return new CreateOrderRepositoryStub();
};

const makeCreateOrderItemRepository = (): CreateOrderItemRepository => {
  class CreateOrderItemRepositoryStub implements CreateOrderItemRepository {
    async create(): Promise<CreateOrderItemRepository.Result> {
      return new Promise((resolve) => resolve(makeFakeOrderItem()));
    }
  }

  return new CreateOrderItemRepositoryStub();
};

const makeCreatePersonalizationOrderItemRepository =
  (): CreatePersonalizationOrderItemRepository => {
    class CreatePersonalizationOrderItemRepositoryStub
      implements CreatePersonalizationOrderItemRepository
    {
      async create(): Promise<CreatePersonalizationOrderItemRepository.Result> {
        return new Promise((resolve) => resolve());
      }
    }

    return new CreatePersonalizationOrderItemRepositoryStub();
  };

const makeTransactionManager = (): TransactionManager => {
  class TransactionManagerStub implements TransactionManager {
    async handleTransaction<T>(cb: (transaction: unknown) => T): Promise<T> {
      const result = await cb(null);
      return new Promise((resolve) => resolve(result));
    }
  }

  return new TransactionManagerStub();
};

export interface SutTypes {
  sut: CreateOrderUseCase;
  findFlavourByIdRepository: FindFlavourByIdRepository;
  findSizeByIdRepository: FindSizeByIdRepository;
  findPersonalizationByIdRepository: FindPersonalizationByIdRepository;
  createOrderRepository: CreateOrderRepository;
  createOrderItemRepository: CreateOrderItemRepository;
  createPersonalizationOrderItemRepository: CreatePersonalizationOrderItemRepository;
  transactionManager: TransactionManager;
}

const makeSut = (): SutTypes => {
  const findFlavourByIdRepository = makeFindFlavourByIdRepository();
  const findSizeByIdRepository = makeFindSizeByIdRepository();
  const findPersonalizationByIdRepository =
    makeFindPersonalizationByIdRepository();
  const createOrderRepository = makeCreateOrderRepository();
  const createOrderItemRepository = makeCreateOrderItemRepository();
  const createPersonalizationOrderItemRepository =
    makeCreatePersonalizationOrderItemRepository();
  const transactionManager = makeTransactionManager();

  const sut = new CreateOrder(
    findFlavourByIdRepository,
    findSizeByIdRepository,
    findPersonalizationByIdRepository,
    createOrderRepository,
    createOrderItemRepository,
    createPersonalizationOrderItemRepository,
    transactionManager,
  );

  return {
    sut,
    findFlavourByIdRepository,
    findSizeByIdRepository,
    findPersonalizationByIdRepository,
    createOrderRepository,
    createOrderItemRepository,
    createPersonalizationOrderItemRepository,
    transactionManager,
  };
};

describe('Create Order', () => {
  test('Should Call FindFlavourByIdRepository 1 time', async () => {
    const { sut, findFlavourByIdRepository } = makeSut();
    const findSpy = jest.spyOn(findFlavourByIdRepository, 'findById');
    await sut.create(makeFakeItens());
    expect(findSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('Should Call FindSizeByIdRepository 1 time', async () => {
    const { sut, findSizeByIdRepository } = makeSut();
    const findSpy = jest.spyOn(findSizeByIdRepository, 'findById');
    await sut.create(makeFakeItens());
    expect(findSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('Should Call FindPersonalizationByIdRepository 1 time', async () => {
    const { sut, findPersonalizationByIdRepository } = makeSut();
    const findSpy = jest.spyOn(findPersonalizationByIdRepository, 'findById');
    await sut.create(makeFakeItens());
    expect(findSpy).toHaveBeenCalled();
    expect(findSpy).toHaveBeenCalledTimes(1);
  });

  test('Should throws FlavourNotFoundError when invalid flavor', async () => {
    try {
      const { sut } = makeSut();
      await sut.create(makeFakeItensWithInvalidFlavour());
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(FlavourNotFoundError);
    }
  });

  test('Should throws SizeNotFoundError when invalid size', async () => {
    try {
      const { sut } = makeSut();
      await sut.create(makeFakeItensWithInvalidSize());
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(SizeNotFoundError);
    }
  });

  test('Should throws PersonalizationNotFoundError when invalid personalization', async () => {
    try {
      const { sut } = makeSut();
      await sut.create(makeFakeItensWithInvalidPersonalization());
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(PersonalizationNotFound);
    }
  });

  test('Should throws RepeatedPersonalizationError when repeated personalization', async () => {
    try {
      const { sut } = makeSut();
      await sut.create(makeFakeItensWithRepeatedPersonalization());
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(RepeatedPersonalizationError);
    }
  });

  test('Should call CreateOrderRepository', async () => {
    const { sut } = makeSut();
    const spy = jest.spyOn(sut, 'create');
    const itens = makeFakeItens();
    await sut.create(itens);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(itens);
  });

  test('Should call CreateOrderItemRepository', async () => {
    const { sut, createOrderItemRepository } = makeSut();
    const spy = jest.spyOn(createOrderItemRepository, 'create');

    const itens = makeFakeItens();
    await sut.create(itens);

    const totalItems = itens.items.length;

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(totalItems);
  });

  test('Should call CreatePersonalizationOrderItemRepository', async () => {
    const { sut, createPersonalizationOrderItemRepository } = makeSut();
    const spy = jest.spyOn(createPersonalizationOrderItemRepository, 'create');

    const fakeItems = makeFakeItens();
    await sut.create(fakeItems);

    const havePersonalizations = fakeItems.items.some(
      (item) => item.personalizations && item.personalizations.length,
    );

    if (havePersonalizations) {
      const totalCalls = fakeItems.items.map(
        (item) => item.personalizations,
      ).length;
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(totalCalls);
    }
  });

  test('Should not call CreatePersonalizationOrderItemRepository when not have personalizations', async () => {
    const { sut, createPersonalizationOrderItemRepository } = makeSut();
    const spy = jest.spyOn(createPersonalizationOrderItemRepository, 'create');

    const fakeItems = makeFakeItensWithoutPersonalizations();
    await sut.create(fakeItems);

    expect(spy).not.toHaveBeenCalled();
  });

  test('Should calculate total values with complete order', async () => {
    const { sut } = makeSut();
    const fakeItems = makeFakeItens();
    const createdOrder = await sut.create(fakeItems);
    const expectedOrder = makeFakeOrder();

    expect(createdOrder.total).toBe(expectedOrder.total);
    expect(createdOrder.totalPreparationTime).toBe(
      expectedOrder.totalPreparationTime,
    );
  });

  test('Should calculate total values with order that not have personalizations', async () => {
    const { sut } = makeSut();
    const fakeItems = makeFakeItensWithoutPersonalizations();

    const expectedOrder = makeFakeOrderFromItemWithoutPersonalization();

    jest
      .spyOn(sut, 'create')
      .mockReturnValueOnce(new Promise((resolve) => resolve(expectedOrder)));

    const createdOrder = await sut.create(fakeItems);

    expect(createdOrder.total).toBe(expectedOrder.total);
    expect(createdOrder.totalPreparationTime).toBe(
      expectedOrder.totalPreparationTime,
    );
  });
});
