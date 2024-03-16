import { PersonalizationOrderItemModel } from 'src/domain/models';

export interface CreatePersonalizationOrderItemRepository {
  create(
    parameters: CreatePersonalizationOrderItemRepository.Parameters,
    transaction?: CreatePersonalizationOrderItemRepository.Transaction,
  ): Promise<CreatePersonalizationOrderItemRepository.Result>;
}

export namespace CreatePersonalizationOrderItemRepository {
  export type Parameters = Omit<
    PersonalizationOrderItemModel,
    'id' | 'personalization'
  >[];
  export type Transaction = unknown;
  export type Result = void;
}
