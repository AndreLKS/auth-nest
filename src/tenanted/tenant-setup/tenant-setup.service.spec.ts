import { Test, TestingModule } from '@nestjs/testing';
import { TenantSetupService } from './tenant-setup.service';

describe('TenantSetupService', () => {
  let service: TenantSetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantSetupService],
    }).compile();

    service = module.get<TenantSetupService>(TenantSetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
