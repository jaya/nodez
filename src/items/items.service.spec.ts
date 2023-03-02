import { Test, TestingModule } from '@nestjs/testing';
import { IItemsRepository, InMemoryItemsRepository } from './items.repository';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let repository: IItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: 'IItemsRepository',
          useClass: InMemoryItemsRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get<IItemsRepository>('IItemsRepository');
  });

  it('should return all items', async () => {
    const response = await service.getAll();

    expect(response).toEqual(await repository.findAll());
  });
});
