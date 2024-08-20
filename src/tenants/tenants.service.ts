import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantsService {

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>
  ) {

  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }
}
