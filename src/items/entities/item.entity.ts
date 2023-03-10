import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryItem } from '@/survivors/entities/inventory-item.entity';

@Entity('items')
export class Item {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({ required: true })
  @Column()
  name: string;
  @ApiProperty({ required: true })
  @Column()
  points: number;
  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.item)
  inventoryItems?: InventoryItem[];
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
