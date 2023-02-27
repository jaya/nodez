import { Test, TestingModule } from '@nestjs/testing';
import { Gender } from './survivor.entity';
import { SurvivorsController } from './survivors.controller';
import { InMemorySurvivorsRepository } from './survivors.repository';
import { SurvivorsService } from './survivors.service';

describe('SurvivorsController', () => {
  let controller: SurvivorsController;
  let service: SurvivorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurvivorsController],
      providers: [
        SurvivorsService,
        {
          provide: 'ISurvivorsRepository',
          useClass: InMemorySurvivorsRepository,
        },
      ],
    }).compile();

    controller = module.get<SurvivorsController>(SurvivorsController);
    service = module.get<SurvivorsService>(SurvivorsService);
  });

  it('should be able to update a survivor and return', async () => {
    const survivor = {
      id: 'any_id',
      name: 'any_name',
      age: 18,
      gender: Gender.MALE,
      latitude: 1,
      longitude: 1,
    };

    const body = {
      latitude: 2,
      longitude: 2,
    };

    jest.spyOn(service, 'update').mockResolvedValue({
      ...survivor,
      ...body,
    });

    const response = await controller.updateSurvivor('any_id', body);

    expect(response).toMatchObject(body);
  });
});
