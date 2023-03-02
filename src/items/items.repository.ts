import { Item } from './item.entity';

export interface IItemsRepository {
  findAll(): Promise<Item[]>;
}

// TO-DO replace for a typeorm implementation
export class InMemoryItemsRepository implements IItemsRepository {
  private items: Item[];

  constructor() {
    // TO-DO mocked until the typeorm setup is merged then i'm going to create a seed for this
    this.items = [
      {
        id: '4c187bde-cc15-4635-9dd8-f0067e54e2f6',
        name: 'Fiji Water',
        points: 14,
      },
      {
        id: 'ceb54bda-a3c6-4d9b-bb8c-a5aa16dcd8c4',
        name: 'Campbell Soup',
        points: 12,
      },
      {
        id: '15e14c23-ce29-43e5-a6b6-afe2b53ac261',
        name: 'First Aid Pouch',
        points: 10,
      },
      {
        id: 'da8de9ca-b060-4e39-9129-661a0868e3cb',
        name: 'AK47',
        points: 8,
      },
    ];
  }

  async findAll(): Promise<Item[]> {
    return this.items;
  }
}
