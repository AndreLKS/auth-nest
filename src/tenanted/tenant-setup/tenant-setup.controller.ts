import { Controller, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { TenantSetupService } from './tenant-setup.service';
 

@Controller({path: 'tenant-setup'})
export class TenantSetupController {
    constructor(private readonly tenantSetupService: TenantSetupService) { }

    @ApiParam({name: 'tenant', type: 'string'})
    @Post('/create/schema/')
    async createTenantSchema(@Param() params) {
       await this.tenantSetupService.createSchema(params.tenant);
       await this.tenantSetupService.generateRoleResources(params.tenant);
    }

}
