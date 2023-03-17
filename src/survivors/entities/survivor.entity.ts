import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InventoryItem } from './inventory-item.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Entity('survivors')
export class Survivor {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  gender: Gender;
  @Column()
  latitude: number;
  @Column()
  longitude: number;
  @OneToMany(() => InventoryItem, (survivor_item) => survivor_item.owner, {
    cascade: true,
  })
  inventoryItems: InventoryItem[];
  @Column()
  infectedAt?: Date | null;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
