import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity("order_products")
export class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  orderProductUuid?: string;

  @Column({ type: "float" })
  unitPrice: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;
}
