import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { InMemoryItemsRepository } from './items.repository';

@Module({
  controllers: [ItemsController],
  providers: [
    ItemsService,
    {
      provide: 'IItemsRepository',
      useClass: InMemoryItemsRepository,
    },
  ],
})
export class ItemsModule {}
