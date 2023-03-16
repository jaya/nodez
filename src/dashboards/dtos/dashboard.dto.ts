import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ResourceAverageDto } from '@/dashboards/dtos/resource-average.dto';

export class DashboardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  infectedPercentage: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  nonInfectedPercentage: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalLostPoints: number;
  @ApiProperty({ required: true, type: ResourceAverageDto, isArray: true })
  resourcesAverage: ResourceAverageDto[];
}
