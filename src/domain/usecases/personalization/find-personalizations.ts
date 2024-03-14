import { PersonalizationModel } from 'src/domain/models';

export interface FindPersonalizationsUseCase {
  find(): Promise<FindPersonalizationsUseCase.Result>;
}

export namespace FindPersonalizationsUseCase {
  export type Result = PersonalizationModel[];
}
