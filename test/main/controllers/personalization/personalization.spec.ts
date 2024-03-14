import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PersonalizationModule } from '/src/main/controllers/personalization/personalization.module';
import { PersonalizationController } from '/src/main/controllers/personalization/personalization.controller';
import { FindPersonalizationsUseCase } from '/src/domain/usecases';
import { FindPersonalizationsController } from '/src/presentation/controllers';
import { BuildFindPersonalizationsControllerFactory } from '/src/main/factories/controllers';

const makeFindPersonalizations = () => {
  class FindPersonalizationsStub implements FindPersonalizationsUseCase {
    async find(): Promise<FindPersonalizationsUseCase.Result> {
      return new Promise((resolve) => resolve([]));
    }
  }

  return new FindPersonalizationsStub();
};

export interface sutTypes {
  sut: FindPersonalizationsController;
  findPersonalizationsStub: FindPersonalizationsUseCase;
}

const makeSut = (): sutTypes => {
  const findPersonalizationsStub = makeFindPersonalizations();
  const sut = new FindPersonalizationsController(findPersonalizationsStub);

  return {
    sut,
    findPersonalizationsStub,
  };
};

describe('Personalization Controller', () => {
  describe('GET /personalizations', () => {
    it('Should return 200 on load personalizations', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [PersonalizationModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/personalizations/`).expect(200);
    });

    it('Should return 404 on load personalizations', async () => {
      const { findPersonalizationsStub } = makeSut();

      const moduleRef = await Test.createTestingModule({
        imports: [PersonalizationModule],
        controllers: [PersonalizationController],
        providers: [
          {
            provide: BuildFindPersonalizationsControllerFactory.name,
            useFactory: () =>
              new BuildFindPersonalizationsControllerFactory(
                findPersonalizationsStub,
              ),
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/personalizations/`).expect(404);
    });

    it('Should return 500 on load personalizations', async () => {
      const { findPersonalizationsStub } = makeSut();

      jest
        .spyOn(findPersonalizationsStub, 'find')
        .mockRejectedValue(new Error('Testing Error'));

      const moduleRef = await Test.createTestingModule({
        imports: [PersonalizationModule],
        controllers: [PersonalizationController],
        providers: [
          {
            provide: BuildFindPersonalizationsControllerFactory.name,
            useFactory: () =>
              new BuildFindPersonalizationsControllerFactory(
                findPersonalizationsStub,
              ),
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/personalizations/`).expect(500);
    });
  });
});
