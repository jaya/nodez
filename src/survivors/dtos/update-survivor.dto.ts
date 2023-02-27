import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateSurvivorDto {
  @IsLatitude()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsLongitude()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
