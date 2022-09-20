import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './healthcheck.controller';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  describe('When calling the checkStatus route', () => {
    it('should return succsfully', async () => {
      const response = await controller.checkStatus();

      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('status');
    });
  });
});
