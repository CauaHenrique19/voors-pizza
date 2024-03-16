import { OrderItemModel, OrderModel } from 'src/domain/models';

export type Order = Omit<OrderModel, 'itens'> & {
  itens: Omit<OrderItemModel, 'order'>[];
};

export const makeFakeFullOrder = (): Order => {
  return {
    id: 1,
    total: 63.5,
    totalPreparationTime: 45,
    createdAt: new Date(),
    itens: [
      {
        id: 1,
        orderId: 1,
        flavourId: 1,
        sizeId: 1,
        createdAt: new Date(),
        size: {
          id: 1,
          description: 'Pequena',
          preparationTime: 15,
          value: 20.2,
          createdAt: new Date(),
        },
        flavour: {
          id: 1,
          description: 'Calabresa',
          adittionalPreparationTime: null,
          createdAt: new Date(),
        },
        personalizations: [
          {
            id: 2,
            createdAt: new Date(),
            orderItemId: 2,
            personalizationId: 1,
            personalization: {
              id: 1,
              description: 'Extra Bacon',
              value: 3,
              adittionalPreparationTime: null,
              createdAt: new Date(),
            },
          },
          {
            id: 3,
            createdAt: new Date(),
            orderItemId: 2,
            personalizationId: 2,
            personalization: {
              id: 2,
              description: 'Sem Cebola',
              value: null,
              adittionalPreparationTime: null,
              createdAt: new Date(),
            },
          },
          {
            id: 4,
            createdAt: new Date(),
            orderItemId: 2,
            personalizationId: 3,
            personalization: {
              id: 3,
              description: 'Borda Recheada',
              value: 5,
              adittionalPreparationTime: 5,
              createdAt: new Date(),
            },
          },
        ],
      },
    ],
  };
};
