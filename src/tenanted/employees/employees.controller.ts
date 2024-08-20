import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Resource } from 'src/decorators/resource.decorator';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';
import { EmployeesService } from './employees.service';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiTags('employees')
@ApiBearerAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiParam({name: 'tenant', type: 'string'})
  @Resource('clock://employees/_create')
  @Post()
  create(@Body() createEmployeesDto: CreateEmployeesDto) {
    return this.employeesService.create(createEmployeesDto);
  }

  @ApiParam({name: 'tenant', type: 'string'})
  @Resource('clock://employees/_read')
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @ApiParam({name: 'tenant', type: 'string'})
  @Resource('clock://employees/id/_read')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeesService.findOneOrFail({id});
  }

  @ApiParam({name: 'tenant', type: 'string'})
  @Resource('clock://employees/userId/_read')
  @Get('userId/:userId')
  findOneUserId(@Param('userId') userId: number) {
    return this.employeesService.findOneOrFail({userId});
  }  

  @ApiParam({name: 'tenant', type: 'string'})
  @Resource('clock://employees/id/_update')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeesDto: UpdateEmployeesDto) {
    return this.employeesService.update(+id, updateEmployeesDto);
  }

  @ApiParam({name: 'tenant', type: 'string'})
  @Resource('clock://employees/id/_delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.destroy(+id);
  }
}
