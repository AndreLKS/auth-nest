import { Controller, Get, Param } from '@nestjs/common';
import { AppKeyService } from './appkey.service';
import { AppKey } from './appkey.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller({path: 'appkeys'})
export class AppKeyController {
  constructor(private readonly appKeyService: AppKeyService) { }

  @ApiParam({name: 'tenant', type: 'string'})
  @Get()
  findAll(): Promise<AppKey[]> {
    return this.appKeyService.findAll();
  }

  @ApiParam({name: 'tenant', type: 'string'})
  @Get(':appKey')
  findOne(
    @Param('appKey') appKey: string,
  ): Promise<AppKey> {
    return this.appKeyService.findOneOrFail({ key: appKey });
  }

}
