import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import {
  BuildCreateOrderControllerFactory,
  BuildFindOrderByIdControllerFactory,
} from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';

@Module({
  controllers: [OrderController],
  providers: [
    {
      provide: BuildCreateOrderControllerFactory.name,
      useClass: BuildCreateOrderControllerFactory,
    },
    {
      provide: BuildFindOrderByIdControllerFactory.name,
      useClass: BuildFindOrderByIdControllerFactory,
    },
  ],
  imports: [FactoryModule],
})
export class OrderModule {}
