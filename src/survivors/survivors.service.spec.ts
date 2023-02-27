import { Test, TestingModule } from '@nestjs/testing';
import { Gender } from './survivor.entity';
import {
  InMemorySurvivorsRepository,
  ISurvivorsRepository,
} from './survivors.repository';
import { SurvivorsService } from './survivors.service';

describe('SurvivorsService', () => {
  let service: SurvivorsService;
  let repository: ISurvivorsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SurvivorsService,
        {
          provide: 'ISurvivorsRepository',
          useClass: InMemorySurvivorsRepository,
        },
      ],
    }).compile();

    service = module.get<SurvivorsService>(SurvivorsService);
    repository = module.get<ISurvivorsRepository>('ISurvivorsRepository');
  });

  it('should return an Error if survivor does not exists', async () => {
    await expect(
      service.update({ id: 'any_id', latitude: 1, longitude: 1 }),
    ).rejects.toThrow();
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

    const params = {
      id: 'any_id',
      latitude: 2,
      longitude: 2,
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(survivor);
    jest.spyOn(repository, 'update').mockResolvedValue({
      ...survivor,
      ...params,
    });

    const response = await service.update(params);

    expect(response).toMatchObject(params);
  });
});
