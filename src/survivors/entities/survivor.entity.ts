import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryItem } from './inventory-item.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Entity()
export class Survivor {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @ApiProperty({ required: true })
  @Column()
  age: number;
  @ApiProperty({ required: true })
  @Column()
  gender: Gender;
  @ApiProperty({ required: true })
  @Column()
  latitude: number;
  @ApiProperty({ required: true })
  @Column()
  longitude: number;
  @ApiProperty({ required: true, type: InventoryItem, isArray: true })
  @OneToMany(() => InventoryItem, (survivor_item) => survivor_item.owner, {
    cascade: true,
  })
  inventoryItems: InventoryItem[];
}
