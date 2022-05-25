import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("addreses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  addressUuid?: string;

  @Column()
  street: string;

  @Column()
  houseNumber: number;

  @Column()
  city: string;

  @OneToOne(() => User, (user) => user.address, { nullable: true })
  @JoinColumn()
  user: User;
}
