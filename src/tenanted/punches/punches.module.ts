import { Module } from '@nestjs/common';
import { PunchesController } from './punches.controller';
import { PunchesService } from './punches.service';

@Module({
  controllers: [PunchesController],
  providers: [PunchesService],
  exports: [PunchesService]
})
export class PunchesModule {}
