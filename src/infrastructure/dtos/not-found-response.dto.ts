import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string[];
  @ApiProperty()
  error: string;
}
