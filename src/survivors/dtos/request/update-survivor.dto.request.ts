import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSurvivorDtoRequest {
  @ApiProperty({ required: true })
  @IsLatitude()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ required: true })
  @IsLongitude()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
