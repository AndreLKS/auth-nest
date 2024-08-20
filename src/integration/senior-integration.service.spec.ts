import { Test, TestingModule } from '@nestjs/testing';
import { SeniorIntegrationService } from './senior-integration.service';

describe('SeniorIntegrationService', () => {
  let service: SeniorIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeniorIntegrationService],
    }).compile();

    service = module.get<SeniorIntegrationService>(SeniorIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
