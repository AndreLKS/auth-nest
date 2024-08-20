import { Test, TestingModule } from '@nestjs/testing';

import { PunchesController } from './punches.controller';
import { PunchesService } from './punches.service';

describe('PunchesController', () => {
  let controller: PunchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PunchesController],
      providers: [PunchesService],
    }).compile();

    controller = module.get<PunchesController>(PunchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
