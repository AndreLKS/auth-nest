import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TenantSetupController } from './tenant-setup.controller';
import { TenantSetupService } from './tenant-setup.service';

@Module({
  controllers: [TenantSetupController],
  providers: [TenantSetupService],
  imports:[AuthModule, HttpModule]
})
export class TenantSetupModule {}
