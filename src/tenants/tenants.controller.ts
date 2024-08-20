import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Resource } from 'src/decorators/resource.decorator';
import { Tenant } from './tenant.entity';
import { TenantsService } from './tenants.service';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) { }

  @Resource('clock://tenants/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
