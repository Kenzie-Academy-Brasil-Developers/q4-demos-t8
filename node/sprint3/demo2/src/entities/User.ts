import { compare } from "bcrypt";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";
import { Address } from "./Address";
import { Order } from "./Order";
import { Restaurant } from "./Restaurant";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  userUuid?: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isAdmin?: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  comparePwd = async (pwdString: string): Promise<boolean> => {
    return await compare(pwdString, this.password);
  };
}
