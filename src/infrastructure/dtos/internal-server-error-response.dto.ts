import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class InternalServerErrorResponseDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
