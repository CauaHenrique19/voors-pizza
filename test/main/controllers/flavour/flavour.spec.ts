import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { FlavourModule } from 'src/main/controllers/flavour/flavour.module';
import { FlavourController } from 'src/main/controllers/flavour/flavour.controller';
import { FindFlavoursUseCase } from 'src/domain/usecases';
import { FindFlavoursController } from 'src/presentation/controllers';
import { BuildFindFlavoursControllerFactory } from 'src/main/factories/controllers';

const makeFindFlavour = () => {
  class FindFlavoursStub implements FindFlavoursUseCase {
    async find(): Promise<FindFlavoursUseCase.Result> {
      return new Promise((resolve) => resolve([]));
    }
  }

  return new FindFlavoursStub();
};

export interface sutTypes {
  sut: FindFlavoursController;
  findFlavoursStub: FindFlavoursUseCase;
}

const makeSut = (): sutTypes => {
  const findFlavoursStub = makeFindFlavour();
  const sut = new FindFlavoursController(findFlavoursStub);

  return {
    sut,
    findFlavoursStub,
  };
};

describe('Flavour Controller', () => {
  describe('GET /flavours', () => {
    it('Should return 200 on load flavours', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [FlavourModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/flavours/`).expect(200);
    });

    it('Should return 404 on load flavours', async () => {
      const { findFlavoursStub } = makeSut();

      const moduleRef = await Test.createTestingModule({
        imports: [FlavourModule],
        controllers: [FlavourController],
        providers: [
          {
            provide: BuildFindFlavoursControllerFactory.name,
            useFactory: () =>
              new BuildFindFlavoursControllerFactory(findFlavoursStub),
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/flavours/`).expect(404);
    });

    it('Should return 500 on load flavours', async () => {
      const { findFlavoursStub } = makeSut();

      jest
        .spyOn(findFlavoursStub, 'find')
        .mockRejectedValue(new Error('Testing Error'));

      const moduleRef = await Test.createTestingModule({
        imports: [FlavourModule],
        controllers: [FlavourController],
        providers: [
          {
            provide: BuildFindFlavoursControllerFactory.name,
            useFactory: () =>
              new BuildFindFlavoursControllerFactory(findFlavoursStub),
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/flavours/`).expect(500);
    });
  });
});
