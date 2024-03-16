import { PersonalizationModel } from 'src/domain/models';

export interface FindPersonalizationByIdRepository {
  findById(
    parameters: FindPersonalizationByIdRepository.Parameters,
  ): Promise<FindPersonalizationByIdRepository.Result>;
}

export namespace FindPersonalizationByIdRepository {
  export type Parameters = { id: number | number[] };
  export type Result = PersonalizationModel | PersonalizationModel[];
}
