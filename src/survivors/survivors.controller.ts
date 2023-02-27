import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('survivors')
export class SurvivorsController {
  @Post()
  newSurvivor(): any {
    // A survivor must have a *name*, *age*, *gender* and *last location (latitude, longitude)*.
    // We want this database to be accurate, so add basic validation for each field.

    // Each survivor has their inventory of resources/items.
    // The survivor must declare all of their resources in the sign-up process.
    // We will believe they have what they say they have.
    return [{ http_verb: 'POST' }];
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
