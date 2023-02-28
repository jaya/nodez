import { Gender, Survivor } from './survivor.entity';

export interface ISurvivorsRepository {
  findById(id: string): Promise<Survivor | null>;
  update(id: string, data: Partial<Survivor>): Promise<Survivor>;
}

// TO-DO Unit tests if we are going to keep it, or remove do add tests with integrated database
export class InMemorySurvivorsRepository implements ISurvivorsRepository {
  private survivors: Survivor[];

  constructor() {
    this.survivors = [
      // TO-DO this is a mock for testing, remove when the feature to create exists
      {
        id: 'any_id',
        age: 18,
        name: 'John Doe',
        gender: Gender.MALE,
        latitude: 1,
        longitude: 1,
      },
    ];
  }

  async findById(id: string): Promise<Survivor> {
    return this.survivors.find((survivor) => survivor.id === id);
  }

  async update(id: string, data: Partial<Survivor>): Promise<Survivor> {
    const survivorIndex = this.survivors.findIndex(
      (survivor) => survivor.id === id,
    );

    if (survivorIndex === -1) {
      throw new Error('Survivor not found in memory list');
    }

    const existingSurvivor = this.survivors[survivorIndex];

    this.survivors[survivorIndex] = {
      ...existingSurvivor,
      ...data,
    };

    return this.survivors[survivorIndex];
  }
}
