import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateSurvivorDto } from './dtos/update-survivor.dto';
import { CreateSurvivorDto } from './dtos/create-survivor.dto';
import { SurvivorsService } from './survivors.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Survivor } from './entities/survivor.entity';
import { BadRequestResponseDto } from '../infrastructure/dtos/bad-request-response.dto';
import { InternalServerErrorResponseDto } from '../infrastructure/dtos/internal-server-error-response.dto';
import { NotFoundResponseDto } from '@/infrastructure/dtos/not-found-response.dto';

@Controller('survivors')
@ApiTags('survivors')
export class SurvivorsController {
  constructor(private readonly survivorsService: SurvivorsService) {}

  @ApiCreatedResponse({ type: Survivor })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: BadRequestResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  @Post()
  createSurvivor(@Body() body: CreateSurvivorDto): any {
    return this.survivorsService.createSurvivor(body);
  }

  @ApiOkResponse({ type: Survivor })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: BadRequestResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: NotFoundResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  @Patch(':id')
  updateSurvivor(
    @Param('id') id: string,
    @Body() updateSurvivorDto: UpdateSurvivorDto,
  ) {
    return this.survivorsService.update({
      id,
      ...updateSurvivorDto,
    });
  }

  @Get()
  @ApiOkResponse({
    type: Survivor,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: InternalServerErrorResponseDto,
  })
  getSurvivors(@Query('search') search?: string): Promise<Survivor[]> {
    return this.survivorsService.getAll(search);
  }
}
