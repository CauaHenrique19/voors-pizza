import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';
import { BuildFindSizesControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';

@Module({
  controllers: [SizeController],
  providers: [
    {
      provide: BuildFindSizesControllerFactory.name,
      useClass: BuildFindSizesControllerFactory,
    },
  ],
  imports: [FactoryModule],
})
export class SizeModule {}
