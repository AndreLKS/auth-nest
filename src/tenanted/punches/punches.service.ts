import { Inject, Injectable } from '@nestjs/common';
import { createFile, deleteFile, getFile } from 'src/common/helpers/storage.helper';
import { CONNECTION } from 'src/tenancy/tenancy.symbols';
import { DateUtility } from 'src/utility/date.utility';
import { Connection, FindConditions, FindOneOptions, OrderByCondition, Raw, Repository } from 'typeorm';
import { CreatePunchesDto } from './dto/create-punches.dto';
import { UpdatePunchesDto } from './dto/update-punches.dto';
import { Punches } from './punches.entity';

@Injectable()
export class PunchesService {
  private readonly punchesRepository: Repository<Punches>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.punchesRepository = connection.getRepository(Punches);
  }

  async create(createPunchesDto: CreatePunchesDto) {
    const clock = this.punchesRepository.create(createPunchesDto);
    return await this.punchesRepository.save(clock);
  }

  async findPaginated(page: number, perPage: number, conditions: FindConditions<Punches>, order: OrderByCondition) {
    const [result, total] = await this.punchesRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
      relations: ['employee'],
      where: conditions,
      order: order
    });

    return { punches: result, total, maxPages: Math.ceil(total / perPage) };
  }

  async findAll() {
    return await this.punchesRepository.find();
  }

  async findOneOrFail(conditions: FindConditions<Punches>, options?: FindOneOptions<Punches>) {
    return await this.punchesRepository.findOneOrFail(conditions, options);
  }

  async update(id: number, updatePunches: UpdatePunchesDto): Promise<Punches> {
    const clock = await this.findOneOrFail({ id });
    this.punchesRepository.merge(clock, updatePunches);

    return await this.punchesRepository.save(clock);
  }

  async destroy(id: number) {
    const clock = await this.findOneOrFail({ id });
    return await this.punchesRepository.remove(clock);
  }

  async verifyNewPunches() {
    const punches = await this.punchesRepository.count({ where: { exported: false }, relations: ['employee'] });
    return punches;
  }

  formatDate(date: Date = new Date()): string {
    return date.toLocaleDateString('pt-br',{timeZone: 'America/Sao_Paulo'}).replace(new RegExp('/', 'g'), '');
  }

  fotmatTimeFromDate(date: Date = new Date()): string {
    return date.toLocaleTimeString('pt-br',{timeZone: 'America/Sao_Paulo'}).replace(new RegExp(':', 'g'), '').substring(0, 4);
  }

  punchesToLines(punches: Punches[]): string {
    const lines = [];
    punches.forEach(punch => {
      const punchID = punch.id.toString().padStart(11, '0');
      const employeePis = punch.employee.pis.toString().padStart(11, '0');
      const date = this.formatDate(punch.date);
      const time = this.fotmatTimeFromDate(punch.date);

      lines.push(
        `${punchID}${employeePis}${date}${time}`);
    });

    return lines.join('\r\n');
  }

  async markPunchesAsExported(punches: Punches[]) {
    punches.forEach(punch => punch.exported = true);
    await this.punchesRepository.save(punches);
  }

  async exportPunchFile(tenantName: string): Promise<string> {
    const punches = await this.punchesRepository.find({ where: { exported: false }, relations: ['employee'], order: { id: 'ASC' } });
    const path = 'export';
    const fileName = `${new Date().toISOString}${tenantName}-punches.csv`;

    await createFile(path, fileName, this.punchesToLines(punches));

    const file = (await getFile(`${path}/${fileName}`)).toString();

    this.markPunchesAsExported(punches);

    await deleteFile(`${path}/${fileName}`);

    return file;
  }

  async exportPuchesByDate(tenantName: string, startDate: string, endDate: string): Promise<string> {
    endDate = DateUtility.addDayToStringDate(endDate, 1);
   
    const punches = await this.punchesRepository.find({ where: { date: Raw(alias => `${alias} >= '${startDate}' and ${alias} <= '${endDate}'`) }, relations: ['employee'], order: { id: 'ASC' } });
    const path = 'export';
    const fileName = `${new Date().toISOString}${tenantName}-punches.csv`;

    await createFile(path, fileName, this.punchesToLines(punches));

    const file = (await getFile(`${path}/${fileName}`)).toString();

    await deleteFile(`${path}/${fileName}`);

    return file;
  }
}
