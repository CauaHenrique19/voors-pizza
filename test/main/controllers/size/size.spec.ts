import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { FindSizesUseCase } from 'src/domain/usecases';
import { FindSizesController } from 'src/presentation/controllers';
import { BuildFindSizesControllerFactory } from 'src/main/factories/controllers';
import { SizeModule } from 'src/main/controllers/size/size.module';
import { SizeController } from 'src/main/controllers/size/size.controller';

const makeFindSizes = () => {
  class FindSizesStub implements FindSizesUseCase {
    async find(): Promise<FindSizesUseCase.Result> {
      return new Promise((resolve) => resolve([]));
    }
  }

  return new FindSizesStub();
};

export interface sutTypes {
  sut: FindSizesController;
  findSizesStub: FindSizesUseCase;
}

const makeSut = (): sutTypes => {
  const findSizesStub = makeFindSizes();
  const sut = new FindSizesController(findSizesStub);

  return {
    sut,
    findSizesStub,
  };
};

describe('Size Controller', () => {
  describe('GET /sizes', () => {
    it('Should return 200 on load sizes', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [SizeModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/sizes/`).expect(200);
    });

    it('Should return 404 on load personalizations', async () => {
      const { findSizesStub } = makeSut();

      const moduleRef = await Test.createTestingModule({
        imports: [SizeModule],
        controllers: [SizeController],
        providers: [
          {
            provide: BuildFindSizesControllerFactory.name,
            useFactory: () =>
              new BuildFindSizesControllerFactory(findSizesStub),
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/sizes/`).expect(404);
    });

    it('Should return 500 on load sizes', async () => {
      const { findSizesStub } = makeSut();

      jest
        .spyOn(findSizesStub, 'find')
        .mockRejectedValue(new Error('Testing Error'));

      const moduleRef = await Test.createTestingModule({
        imports: [SizeModule],
        controllers: [SizeController],
        providers: [
          {
            provide: BuildFindSizesControllerFactory.name,
            useFactory: () =>
              new BuildFindSizesControllerFactory(findSizesStub),
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/sizes/`).expect(500);
    });
  });
});
