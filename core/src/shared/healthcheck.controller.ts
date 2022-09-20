import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  async checkStatus() {
    return {
      message: 'Ok',
      status: HttpStatus.OK,
    };
  }
}
