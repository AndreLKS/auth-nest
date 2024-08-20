import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { RoleGuard } from 'src/auth/role.guard';
import { Resource } from 'src/decorators/resource.decorator';
import { CreatePunchesDto } from './dto/create-punches.dto';
import { UpdatePunchesDto } from './dto/update-punches.dto';
import { PunchesService } from './punches.service';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
@ApiTags('punches')
@Controller('punches')
export class PunchesController {
  constructor(private readonly punchService: PunchesService) {}

  @Resource('clock://punches/_create')
  @ApiParam({name: 'tenant', type: 'string'})
  @Post()
  create(@Body() createPunchesDto: CreatePunchesDto) {
    return this.punchService.create(createPunchesDto);
  }

  @Resource('clock://punches/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get()
  findAll() {
    return this.punchService.findAll();
  }

  @Resource('clock://punches/history/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get('history')
  findPaginated(@Query('page') page: number, @Query('perPage') perPage: number, @Req() req) {
    return this.punchService.findPaginated(page, perPage, {employee: {userId: req.user.id}}, {date: 'DESC', time: 'DESC'});
  }

  @Resource('clock://punches/export/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get('export/new')
  async verifyNewPunches() {
    return await this.punchService.verifyNewPunches();
  }

  @Resource('clock://punches/export/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get('export')
  async exportPuches(@Param('tenant') tenant: string, @Response() res: ExpressResponse) {
    return await this.punchService.exportPunchFile(tenant).then(async (file) => {
      res.set('Content-Type', 'text/plain');
      res.set('Content-Disposition', `attachment; filename="${tenant}.txt"`);
      return res.send(file);
    });
  }

  @Resource('clock://punches/export/startDate/endDate/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get('export/:startDate/:endDate')
  async exportPuchesByDate(@Param('tenant') tenant: string, @Param('startDate') startDate: string, @Param('endDate') endDate: string, @Response() res: ExpressResponse) {
    return await this.punchService.exportPuchesByDate(tenant, startDate, endDate).then(async (file) => {
      res.set('Content-Type', 'text/plain');
      res.set('Content-Disposition', `attachment; filename="${tenant}_${startDate}_${endDate}.txt"`);
      return res.send(file);
    });
  }  
  
  @Resource('clock://punches/id/_read')
  @ApiParam({name: 'tenant', type: 'string'})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.punchService.findOneOrFail({id});
  }

  @Resource('clock://punches/id/_update')
  @ApiParam({name: 'tenant', type: 'string'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePunchesDto: UpdatePunchesDto) {
    return this.punchService.update(+id, updatePunchesDto);
  }

  @Resource('clock://punches/id/_delete')
  @ApiParam({name: 'tenant', type: 'string'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.punchService.destroy(+id);
  }
}
