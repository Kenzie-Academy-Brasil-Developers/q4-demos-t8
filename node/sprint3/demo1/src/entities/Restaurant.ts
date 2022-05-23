import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity("restaurants")
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  restaurantUuid?: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.restaurants)
  owner: User;

  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];
}
