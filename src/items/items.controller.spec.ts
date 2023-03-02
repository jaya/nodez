import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { InMemoryItemsRepository } from './items.repository';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        ItemsService,
        {
          provide: 'IItemsRepository',
          useClass: InMemoryItemsRepository,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should return all items', async () => {
    const response = await controller.getItems();

    expect(response).toEqual(await service.getAll());
  });
});
