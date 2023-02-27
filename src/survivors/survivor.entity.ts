export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class Survivor {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  latitude: number;
  longitude: number;
}
