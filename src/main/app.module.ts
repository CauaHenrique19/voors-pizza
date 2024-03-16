import { Module } from '@nestjs/common';
import { PersonalizationModule } from 'src/main/controllers/personalization/personalization.module';
import { FlavourModule } from 'src/main/controllers/flavour/flavour.module';
import { SizeModule } from 'src/main/controllers/size/size.module';

@Module({
  imports: [PersonalizationModule, FlavourModule, SizeModule],
})
export class AppModule {}
