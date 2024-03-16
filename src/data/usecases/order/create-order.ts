import { CreateOrderUseCase } from 'src/domain/usecases';
import {
  CreateOrderItemRepository,
  CreateOrderRepository,
  FindFlavourByIdRepository,
  FindSizeByIdRepository,
  FindPersonalizationByIdRepository,
  CreatePersonalizationOrderItemRepository,
} from 'src/data/protocols/db/';
import { TransactionManager } from 'src/data/protocols/transaction-manager';
import {
  FlavourModel,
  PersonalizationModel,
  SizeModel,
} from 'src/domain/models';
import {
  FlavourNotFoundError,
  PersonalizationNotFoundError,
  RepeatedPersonalizationError,
  SizeNotFoundError,
} from 'src/domain/errors';

export class CreateOrder implements CreateOrderUseCase {
  constructor(
    private readonly findFlavourByIdRepository: FindFlavourByIdRepository,
    private readonly findSizeByIdRepository: FindSizeByIdRepository,
    private readonly findPersonalizationById: FindPersonalizationByIdRepository,
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly createOrderItemRepository: CreateOrderItemRepository,
    private readonly createPersonalizationOrderItemRepository: CreatePersonalizationOrderItemRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async create(
    parameters: CreateOrderUseCase.Parameters,
  ): Promise<CreateOrderUseCase.Result> {
    const flavourIds = parameters.items.map((item) => item.flavourId);
    const uniqueFlavourIds = Array.from(new Set(flavourIds));

    const flavours = (await this.findFlavourByIdRepository.findById({
      id: uniqueFlavourIds,
    })) as FlavourModel[];

    const haveAllFlavours = flavourIds.every(
      (id) => !!flavours.find((flavour) => flavour.id === id),
    );

    if (!haveAllFlavours) {
      throw new FlavourNotFoundError();
    }

    const sizeIds = parameters.items.map((item) => item.sizeId);
    const uniqueSizeIds = Array.from(new Set(sizeIds));

    const sizes = (await this.findSizeByIdRepository.findById({
      id: uniqueSizeIds,
    })) as SizeModel[];

    const haveAllSizes = sizeIds.every(
      (id) => !!sizes.find((flavour) => flavour.id === id),
    );

    if (!haveAllSizes) {
      throw new SizeNotFoundError();
    }

    const havePersonalizations = parameters.items.some(
      (item) => item.personalizations && item.personalizations.length,
    );

    let personalizationIds: number[] = [];
    let personalizations: PersonalizationModel[] = [];

    if (havePersonalizations) {
      const haveRepeatedPersonalization = parameters.items.some((item) =>
        this.haveRepeatedItems(item.personalizations),
      );

      if (haveRepeatedPersonalization) {
        throw new RepeatedPersonalizationError();
      }

      personalizationIds = parameters.items
        .map((item) => item.personalizations)
        .flat();
      const uniquePersonalizationIds = Array.from(new Set(personalizationIds));

      personalizations = (await this.findPersonalizationById.findById({
        id: uniquePersonalizationIds,
      })) as PersonalizationModel[];

      const haveAllPersonalizations = personalizationIds.every(
        (id) => !!personalizations.find((flavour) => flavour.id === id),
      );

      if (!haveAllPersonalizations) {
        throw new PersonalizationNotFoundError();
      }
    }

    const flavoursAdittionalTime = flavourIds.reduce((total, item) => {
      const flavour = flavours.find((flavour) => flavour.id === item);
      return total + flavour.adittionalPreparationTime;
    }, 0);

    const totalSize = sizeIds.reduce(
      (total, item) => {
        const size = sizes.find((size) => size.id === item);

        return {
          totalTime: total.totalTime + size.preparationTime,
          totalValue: total.totalValue + size.value,
        };
      },
      { totalTime: 0, totalValue: 0 },
    );

    let totalPersonalization: {
      totalTime: number;
      totalValue: number;
    } = {
      totalTime: 0,
      totalValue: 0,
    };

    if (havePersonalizations) {
      totalPersonalization = personalizationIds.reduce(
        (total, item) => {
          const personalization = personalizations.find(
            (personalization) => personalization.id === item,
          );

          return {
            totalTime:
              total.totalTime +
              (personalization.adittionalPreparationTime || 0),
            totalValue: total.totalValue + (personalization.value || 0),
          };
        },
        { totalTime: 0, totalValue: 0 },
      );
    }

    const totalPreparationTime =
      flavoursAdittionalTime +
      totalSize.totalTime +
      totalPersonalization.totalTime;
    const totalValue = totalSize.totalValue + totalPersonalization.totalValue;

    const now = new Date();

    const order: CreateOrderRepository.Parameters = {
      total: totalValue,
      totalPreparationTime,
      createdAt: now,
    };

    const createdOrder = await this.transactionManager.handleTransaction(
      async (transaction) => {
        const createdOrder = await this.createOrderRepository.create(
          order,
          transaction,
        );

        const promisesOrderItens = parameters.items.map(async (item) => {
          const orderItem = {
            orderId: createdOrder.id,
            flavourId: item.flavourId,
            sizeId: item.sizeId,
            createdAt: now,
          };

          const createdOrderItem = await this.createOrderItemRepository.create(
            orderItem,
            transaction,
          );

          if (item.personalizations && item.personalizations.length) {
            const personalizationOrderItens = item.personalizations.map(
              (personalization) => ({
                orderItemId: createdOrderItem.id,
                personalizationId: personalization,
                createdAt: now,
              }),
            );

            await this.createPersonalizationOrderItemRepository.create(
              personalizationOrderItens,
              transaction,
            );
          }
        });

        await Promise.all(promisesOrderItens);
        return createdOrder;
      },
    );

    return createdOrder;
  }

  haveRepeatedItems(array: number[]) {
    return array.length !== new Set(array).size;
  }
}
