import { Module } from '@nestjs/common';
import { PersonalizationModule } from 'src/main/controllers/personalization/personalization.module';

@Module({
  imports: [PersonalizationModule],
})
export class AppModule {}
