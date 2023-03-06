import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSurvivorDto {
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
