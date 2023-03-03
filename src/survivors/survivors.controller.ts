import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateSurvivorDto } from './dtos/create-survivor.dto';
import { SurvivorsService } from './survivors.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Survivor } from './entities/survivor.entity';
import { BadRequestResponseDto } from '../infrastructure/dtos/bad-request-response.dto';
import { InternalServerErrorResponseDto } from '../infrastructure/dtos/internal-server-error-response.dto';

@Controller('survivors')
@ApiTags('survivors')
export class SurvivorsController {
  constructor(private survivorsService: SurvivorsService) {}
  @ApiCreatedResponse({ type: Survivor })
  @ApiInternalServerErrorResponse()
  @ApiHeader({
    name: 'Authorization',
    description: 'Send the survivor id',
  })
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

  @Patch()
  updateSurvivor(): any {
    // A survivor must have the ability to update their last location, storing the new latitude/longitude pair
    // in the base (no need to track locations, just replacing the previous one is enough).
    return [{ http_verb: 'PATCH' }];
  }

  @Get()
  getSurvivors(): any {
    return [{ http_verb: 'GET' }];
  }
}
