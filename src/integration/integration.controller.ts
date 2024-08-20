import { Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CompanyIntegrationDto } from './dto/senior/company-integration.dto';
import { EmployeeIntegrationDto } from './dto/senior/employee-integration.dto';
import { SeniorIntegrationService } from './senior-integration.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('integracao')
@ApiBearerAuth()
@Controller('integration')
export class IntegrationController {

    constructor(private readonly seniorIntegrationService: SeniorIntegrationService) {}

    @ApiParam({name: 'tenant', type: 'string'})
    @Post('senior')
    importSeniorData(
        @Body('company') company : CompanyIntegrationDto,  
        @Body('employee') employee : EmployeeIntegrationDto,
        @Req() req : Request
    ) {
  
      return this.seniorIntegrationService.execute(company, employee, req.params.tenant, req.headers.authorization);
    }
    
    @ApiParam({name: 'tenant', type: 'string'})
    @Post('senior/batch')
    importBatchSeniorData(
        @Body('company') company : CompanyIntegrationDto,  
        @Body('employees') employees : EmployeeIntegrationDto[],
        @Req() req : Request
    ) {
  
      return this.seniorIntegrationService.executeBatch(company, employees, req.params.tenant, req.headers.authorization);
    }
       
}

