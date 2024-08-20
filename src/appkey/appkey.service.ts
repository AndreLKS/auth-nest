import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { AppKey } from './appkey.entity';

@Injectable()
export class AppKeyService {

  constructor(
    @InjectRepository(AppKey)
    private readonly appKeyRepository: Repository<AppKey>
  ) {

  }

  async findAll(): Promise<AppKey[]> {
    return this.appKeyRepository.find();
  }

  async findByKey(appKey: string) {
      return await this.appKeyRepository.findOne({where: {key: appKey}});
  }

  async findOneOrFail(
    conditions?: FindConditions<AppKey>,
    options?: FindOneOptions<AppKey>,
  ) {
    try {
      return await this.appKeyRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
