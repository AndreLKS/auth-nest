import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { EmployeesModule } from '../employees/employees.module';
import { PunchesModule } from '../punches/punches.module';
import { ClockController } from './clock.controller';
import { ClockService } from './clock.service';


@Module({
  controllers: [ClockController],
  providers: [ClockService],
  imports:[
      EmployeesModule, 
      PunchesModule,
      AuthModule
    ],
})
export class ClockModule {}
