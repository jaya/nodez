import { Controller, Post, Body } from '@nestjs/common';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { Survivor } from './entities/survivor.entity';
import { SurvivorsService } from './survivors.service';

@Controller('survivors')
export class SurvivorsController {
  constructor(private survivorsService: SurvivorsService) {}

  @Post()
  create(@Body() createSurvivortDto: CreateSurvivorDto): Survivor {
    const newSurvivor: Survivor =
      this.survivorsService.createSurvivor(createSurvivortDto);

    return newSurvivor;
  }
}
