import { Inject, Injectable } from '@nestjs/common';
import { CONNECTION } from 'src/tenancy/tenancy.symbols';
import { Connection, FindConditions, FindOneOptions, Repository } from 'typeorm';
import { Companies } from './companies.entity';
import { CreateCompaniesDto } from './dto/create-companies.dto';
import { UpdateCompaniesDto } from './dto/update-companies.dto';

@Injectable()
export class CompaniesService {
  private readonly companyRepository: Repository<Companies>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.companyRepository = connection.getRepository(Companies);
  }

  async create(createCompanyDto: CreateCompaniesDto): Promise<Companies> {
    const company = this.companyRepository.create(createCompanyDto);
    return await this.companyRepository.save(company);
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  async findOneOrFail(conditions: FindConditions<Companies>, options?: FindOneOptions<Companies>): Promise<Companies> {
    return await this.companyRepository.findOneOrFail(conditions, options);
  }

  async update(id: number, updateCompanyDto: UpdateCompaniesDto): Promise<Companies> {
    const company = await this.findOneOrFail({ id });
    this.companyRepository.merge(company, updateCompanyDto);
    
    return await this.companyRepository.save(company);
  }

  async destroy(id: number) {
    const company = await this.findOneOrFail({ id });

    return await this.companyRepository.remove(company);

  }
}
