import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Resource } from 'src/decorators/resource.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompaniesDto } from './dto/create-companies.dto';
import { UpdateCompaniesDto } from './dto/update-companies.dto';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiTags('company')
@ApiBearerAuth()
@Controller('company')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Resource('clock://company/_create')
  @ApiParam({name: 'tenant', type: 'string'})
  @Post()
  create(@Body() createCompanyDto: CreateCompaniesDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Resource('clock://company/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Resource('clock://company/id/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companiesService.findOneOrFail({id});
  }

  @Resource('clock://company/id/_update')
  @ApiParam({name: 'tenant', type: 'string'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompaniesDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Resource('clock://company/id/_delete')
  @ApiParam({name: 'tenant', type: 'string'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.destroy(+id);
  }
}
