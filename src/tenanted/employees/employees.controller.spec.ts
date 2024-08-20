import { Test, TestingModule } from '@nestjs/testing';

import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';

describe('EmployeeController', () => {
  let controller: EmployeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
