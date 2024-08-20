import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from 'src/tenancy/tenancy.symbols';
import { Connection, FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { UpdateEmployeesDto } from './dto/update-employees.dto';
import { Employees } from './employees.entity';


@Injectable()
export class EmployeesService {
  private readonly employeeRepository: Repository<Employees>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.employeeRepository = connection.getRepository(Employees);
  }
  async create(createEmployeesDto: CreateEmployeesDto) {
    const employee = this.employeeRepository.create(createEmployeesDto);
    return await this.employeeRepository.save(employee);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOneOrFail(conditions: FindConditions<Employees>, options?: FindOneOptions<Employees>) {
    return await this.employeeRepository.findOneOrFail(conditions, options);
  }

  async update(id: number, updateEmployeesDto: UpdateEmployeesDto): Promise<Employees> {
    const employee = await this.findOneOrFail({ id });
    this.employeeRepository.merge(employee, updateEmployeesDto);
    return this.employeeRepository.save(employee);
  }

  async destroy(id: number) {
    const employee = await this.findOneOrFail({ id });
    return await this.employeeRepository.remove(employee);
  }
}
