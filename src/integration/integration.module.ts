import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesService } from 'src/tenanted/companies/companies.service';
import { EmployeesService } from 'src/tenanted/employees/employees.service';
import { IntegrationController } from './integration.controller';
import { SeniorIntegrationService } from './senior-integration.service';


@Module({
  imports:[HttpModule] , 
  providers: [SeniorIntegrationService, CompaniesService, EmployeesService],
  controllers: [IntegrationController],
})
export class IntegrationModule {}
