import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { Survivor } from './entities/survivor.entity';
import { SurvivorsService } from './services/survivors.service';

@ApiTags('Survivors')
@Controller('survivors')
export class SurvivorsController {
  constructor(private survivorsService: SurvivorsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully', type: Survivor })
  @ApiOperation({ summary: 'Create a survivor' })
  create(@Body() createSurvivortDto: CreateSurvivorDto): Survivor {
    const survivor: Survivor =
      this.survivorsService.createSurvivor(createSurvivortDto);

    return survivor;
  }
}
