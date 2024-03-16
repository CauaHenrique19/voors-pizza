import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import {
  CreateOrderUseCase,
  FindOrderByIdUseCase,
} from 'src/domain/usecases/order';
import {
  makeFakeItens,
  makeFakeItensWithInvalidFlavour,
  makeFakeItensWithInvalidPersonalization,
  makeFakeItensWithInvalidSize,
  makeFakeItensWithRepeatedPersonalization,
  makeFakeOrder,
} from 'test/domain/mocks/order/create-order.mock';
import { CreateOrderController } from 'src/presentation/controllers';
import { OrderModule } from 'src/main/controllers/order/order.module';
import { OrderController } from 'src/main/controllers/order/order.controller';
import {
  BuildCreateOrderControllerFactory,
  BuildFindOrderByIdControllerFactory,
} from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';
import { makeFakeFullOrder } from 'test/domain/mocks/order/find-order.mock';

const makeCreateOrder = () => {
  class CreateOrderStub implements CreateOrderUseCase {
    async create(): Promise<CreateOrderUseCase.Result> {
      return new Promise((resolve) => resolve(makeFakeOrder()));
    }
  }

  return new CreateOrderStub();
};

const makeFindOrderById = () => {
  class FindOrderStub implements FindOrderByIdUseCase {
    async find(): Promise<FindOrderByIdUseCase.Result> {
      return new Promise((resolve) => resolve(makeFakeFullOrder()));
    }
  }

  return new FindOrderStub();
};

export interface sutTypes {
  sut: CreateOrderController;
  createOrderStub: CreateOrderUseCase;
  findOrderByIdStub: FindOrderByIdUseCase;
}

const makeSut = (): sutTypes => {
  const createOrderStub = makeCreateOrder();
  const findOrderByIdStub = makeFindOrderById();
  const sut = new CreateOrderController(createOrderStub);

  return {
    sut,
    createOrderStub,
    findOrderByIdStub,
  };
};

describe('Order Controller', () => {
  describe('POST /order', () => {
    it('Should return 200 on create order', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [OrderModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post(`/orders/`)
        .send({ items: makeFakeItens().items })
        .expect(200);
    });

    it('Should return 404 on invalid size', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [OrderModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post(`/orders/`)
        .send({ items: makeFakeItensWithInvalidSize().items })
        .expect(404);
    });

    it('Should return 404 on invalid flavour', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [OrderModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post(`/orders/`)
        .send({ items: makeFakeItensWithInvalidFlavour().items })
        .expect(404);
    });

    it('Should return 404 on invalid personalization', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [OrderModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post(`/orders/`)
        .send({ items: makeFakeItensWithInvalidPersonalization().items })
        .expect(404);
    });

    it('Should return 400 on repeated personalization', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [OrderModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post(`/orders/`)
        .send({ items: makeFakeItensWithRepeatedPersonalization().items })
        .expect(400);
    });

    it('Should return 500 on create order', async () => {
      const { createOrderStub } = makeSut();

      jest.spyOn(createOrderStub, 'create').mockImplementationOnce(() => {
        throw new Error('Testing Error');
      });

      const moduleRef = await Test.createTestingModule({
        imports: [FactoryModule],
        controllers: [OrderController],
        providers: [
          {
            provide: BuildCreateOrderControllerFactory.name,
            useFactory: () =>
              new BuildCreateOrderControllerFactory(createOrderStub),
          },
          {
            provide: BuildFindOrderByIdControllerFactory.name,
            useClass: BuildFindOrderByIdControllerFactory,
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post(`/orders/`)
        .send({ items: makeFakeItens().items })
        .expect(500);
    });
  });

  describe('GET /order/:id', () => {
    it('Should return 200 on find order', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [OrderModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/orders/1`).expect(200);
    });

    it('Should return 404 when order not found', async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [OrderModule],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer())
        .post(`/orders/99999999999`)
        .expect(404);
    });

    it('Should return 500 on find order', async () => {
      const { findOrderByIdStub } = makeSut();

      jest.spyOn(findOrderByIdStub, 'find').mockImplementationOnce(() => {
        throw new Error('Testing Error');
      });

      const moduleRef = await Test.createTestingModule({
        imports: [FactoryModule],
        controllers: [OrderController],
        providers: [
          {
            provide: BuildCreateOrderControllerFactory.name,
            useClass: BuildCreateOrderControllerFactory,
          },
          {
            provide: BuildFindOrderByIdControllerFactory.name,
            useFactory: () =>
              new BuildFindOrderByIdControllerFactory(findOrderByIdStub),
          },
        ],
      }).compile();

      const app = moduleRef.createNestApplication();
      await app.init();

      await request(app.getHttpServer()).get(`/orders/1`).expect(500);
    });
  });
});
