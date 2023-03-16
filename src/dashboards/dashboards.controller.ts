import { Controller, Get } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardDto } from '@/dashboards/dtos/dashboard.dto';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { InternalServerErrorResponseDto } from '@/infrastructure/dtos/internal-server-error-response.dto';

@Controller('dashboard')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  @ApiOkResponse({
    type: DashboardDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  @Get()
  getDashboard() {
    return this.dashboardsService.get();
  }
}
