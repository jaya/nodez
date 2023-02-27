import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateSurvivorDto } from './dtos/update-survivor.dto';
import { SurvivorsService } from './survivors.service';

@Controller('survivors')
export class SurvivorsController {
  constructor(private readonly survivorsService: SurvivorsService) {}

  @Post()
  createSurvivor(): any {
    // A survivor must have a *name*, *age*, *gender* and *last location (latitude, longitude)*.
    // We want this database to be accurate, so add basic validation for each field.

    // Each survivor has their inventory of resources/items.
    // The survivor must declare all of their resources in the sign-up process.
    // We will believe they have what they say they have.
    return [{ http_verb: 'POST' }];
  }

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
  getSurvivors(): any {
    return [{ http_verb: 'GET' }];
  }
}
