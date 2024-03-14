import { PersonalizationModel } from 'src/domain/models';

export interface FindPersonalizationsRepository {
  find(): Promise<FindPersonalizationsRepository.Result>;
}

export namespace FindPersonalizationsRepository {
  export type Result = PersonalizationModel[];
}
