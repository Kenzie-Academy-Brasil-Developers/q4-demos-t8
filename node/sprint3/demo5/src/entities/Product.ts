import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderProduct } from "./OrderProduct";
import { Restaurant } from "./Restaurant";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  productUuid?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "float" })
  price: number;

  @Column({ default: true })
  available?: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products)
  restaurant: Restaurant;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
