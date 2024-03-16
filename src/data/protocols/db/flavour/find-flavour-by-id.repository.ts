import { FlavourModel } from 'src/domain/models';

export interface FindFlavourByIdRepository {
  findById(
    parameters: FindFlavourByIdRepository.Parameters,
  ): Promise<FindFlavourByIdRepository.Result>;
}

export namespace FindFlavourByIdRepository {
  export type Parameters = { id: number | number[] };
  export type Result = FlavourModel | FlavourModel[];
}
