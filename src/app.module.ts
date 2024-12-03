import { Module } from '@nestjs/common';
import { VisitModule } from './modules/visit.module';

@Module({
  imports: [VisitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
