import { Module } from '@nestjs/common';
import { PersonalizationController } from './personalization.controller';
import { BuildFindPersonalizationsControllerFactory } from 'src/main/factories/controllers';
import { FactoryModule } from 'src/main/factories/usecases/factory.module';

@Module({
  controllers: [PersonalizationController],
  providers: [
    {
      provide: BuildFindPersonalizationsControllerFactory.name,
      useClass: BuildFindPersonalizationsControllerFactory,
    },
  ],
  imports: [FactoryModule],
})
export class PersonalizationModule {}
