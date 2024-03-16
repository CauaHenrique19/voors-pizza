import { OrderItemModel, OrderModel } from 'src/domain/models';
import { CreateOrderUseCase } from 'src/domain/usecases/order';

export const makeFakeItens = (): CreateOrderUseCase.Parameters => {
  return {
    items: [
      {
        sizeId: 1,
        flavourId: 1,
        personalizations: [1, 2, 3],
      },
      {
        sizeId: 2,
        flavourId: 2,
        personalizations: [2, 3],
      },
    ],
  };
};

export const makeFakeItensWithoutPersonalizations =
  (): CreateOrderUseCase.Parameters => {
    return {
      items: [
        {
          sizeId: 1,
          flavourId: 1,
        },
        {
          sizeId: 2,
          flavourId: 2,
        },
      ],
    };
  };

export const makeFakeItensWithInvalidSize =
  (): CreateOrderUseCase.Parameters => {
    return {
      items: [
        {
          sizeId: 10,
          flavourId: 1,
          personalizations: [1, 2, 3],
        },
        {
          sizeId: 2,
          flavourId: 2,
          personalizations: [2, 3],
        },
      ],
    };
  };

export const makeFakeItensWithInvalidFlavour =
  (): CreateOrderUseCase.Parameters => {
    return {
      items: [
        {
          sizeId: 1,
          flavourId: 10,
          personalizations: [1, 2, 3],
        },
        {
          sizeId: 2,
          flavourId: 2,
          personalizations: [2, 3],
        },
      ],
    };
  };

export const makeFakeItensWithInvalidPersonalization =
  (): CreateOrderUseCase.Parameters => {
    return {
      items: [
        {
          sizeId: 1,
          flavourId: 1,
          personalizations: [1, 2, 3, 10],
        },
        {
          sizeId: 2,
          flavourId: 2,
          personalizations: [2, 3],
        },
      ],
    };
  };

export const makeFakeItensWithRepeatedPersonalization =
  (): CreateOrderUseCase.Parameters => {
    return {
      items: [
        {
          sizeId: 1,
          flavourId: 1,
          personalizations: [1, 2, 3, 3],
        },
        {
          sizeId: 2,
          flavourId: 2,
          personalizations: [2, 3],
        },
      ],
    };
  };

export const makeFakeOrder = (): Omit<OrderModel, 'itens'> => {
  return {
    id: 1,
    total: 63.5,
    totalPreparationTime: 45,
    createdAt: new Date(),
  };
};

export const makeFakeOrderFromItemWithoutPersonalization = (): Omit<
  OrderModel,
  'itens'
> => {
  return {
    id: 1,
    total: 50.5,
    totalPreparationTime: 35,
    createdAt: new Date(),
  };
};

export const makeFakeOrderItem = (): Omit<
  OrderItemModel,
  'order' | 'flavour' | 'size' | 'personalizations'
> => {
  return {
    id: 1,
    orderId: 1,
    flavourId: 1,
    sizeId: 1,
    createdAt: new Date(),
  };
};
