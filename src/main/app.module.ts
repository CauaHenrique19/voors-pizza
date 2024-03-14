import { Module } from '@nestjs/common';
import { PersonalizationModule } from 'src/main/controllers/personalization/personalization.module';
import { FlavourModule } from 'src/main/controllers/flavour/flavour.module';

@Module({
  imports: [PersonalizationModule, FlavourModule],
})
export class AppModule {}
