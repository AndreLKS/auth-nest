import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppKeyService } from './appkey.service';
import { AppKeyController } from './appkey.controller';
import { AppKey } from './appkey.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AppKey])],
  providers: [AppKeyService],
  controllers: [AppKeyController],
  exports: [AppKeyService]
})
export class AppKeyModule {}
