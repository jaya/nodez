import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InventoryItem } from '../../survivors/entities/inventory-item.entity';

@Entity()
export class Item {
  @ApiProperty({ required: true })
  @PrimaryGeneratedColumn()
  id: string;
  @ApiProperty({ required: true })
  @Column()
  name: string;
  @ApiProperty({ required: true })
  @Column()
  points: number;
  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.item)
  inventoryItems?: InventoryItem[];
}
