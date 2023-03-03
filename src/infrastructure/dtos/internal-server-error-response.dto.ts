import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponseDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
