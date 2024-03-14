import { Module } from '@nestjs/common';
import { FlavourController } from './flavour.controller';
import { BuildFindFlavoursControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';

@Module({
  controllers: [FlavourController],
  providers: [
    {
      provide: BuildFindFlavoursControllerFactory.name,
      useClass: BuildFindFlavoursControllerFactory,
    },
  ],
  imports: [FactoryModule],
})
export class FlavourModule {}
