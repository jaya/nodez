import { Test, TestingModule } from '@nestjs/testing';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { SurvivorsService } from './Survivors.service';

describe('SurvivorsService', () => {
  let service: SurvivorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurvivorsService],
    }).compile();

    service = module.get<SurvivorsService>(SurvivorsService);
  });

  it('creates a new survivor', () => {
    const createSurvivorDto: CreateSurvivorDto = {
      name: 'Foo',
      age: 10,
      gender: 'female',
    };
    expect(service.createSurvivor(createSurvivorDto)).toEqual(
      expect.objectContaining({ name: 'Foo', age: 10, gender: 'female' }),
    );
  });
});
