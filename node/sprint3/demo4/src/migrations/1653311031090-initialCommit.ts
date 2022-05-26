import { hashSync } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

import * as dotenv from "dotenv";

dotenv.config();

export class initialCommit1653311031090 implements MigrationInterface {
  name = "initialCommit1653311031090";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("userUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_4309f0e033d9da5c1f3fd07b7d7" PRIMARY KEY ("userUuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "restaurants" ("restaurantUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "ownerUserUuid" uuid, CONSTRAINT "PK_4e81b7db41a451893b9b76ff580" PRIMARY KEY ("restaurantUuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("productUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "price" double precision NOT NULL, "available" boolean NOT NULL DEFAULT true, "restaurantRestaurantUuid" uuid, CONSTRAINT "PK_40679e22a2344b14bbfda4f5ec8" PRIMARY KEY ("productUuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order_products" ("orderProductUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "unitPrice" double precision NOT NULL, "orderOrderUuid" uuid, "productProductUuid" uuid, CONSTRAINT "PK_43450b0f31dc4204bf3ff629961" PRIMARY KEY ("orderProductUuid"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("orderUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" double precision NOT NULL, "userUserUuid" uuid, CONSTRAINT "PK_57d6d0fd41cd82db7bc2dd288b8" PRIMARY KEY ("orderUuid"))`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants" ADD CONSTRAINT "FK_7b4694ce99045cb61b9127440dd" FOREIGN KEY ("ownerUserUuid") REFERENCES "users"("userUuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_a58f156b92a7e63b0a6b6d5cbb4" FOREIGN KEY ("restaurantRestaurantUuid") REFERENCES "restaurants"("restaurantUuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_3d4ff82eba047d96f22605ceeaf" FOREIGN KEY ("orderOrderUuid") REFERENCES "orders"("orderUuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" ADD CONSTRAINT "FK_27c566cf8c37cc17dc432e70225" FOREIGN KEY ("productProductUuid") REFERENCES "products"("productUuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e8c8ab9aa669702cb4bdb821161" FOREIGN KEY ("userUserUuid") REFERENCES "users"("userUuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `
        INSERT INTO "users" ("email", "password", "isAdmin")
        VALUES ('${process.env.ADMIN_EMAIL}', '${hashSync(
        process.env.ADMIN_PASSWORD,
        10
      )}', true)
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_e8c8ab9aa669702cb4bdb821161"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_27c566cf8c37cc17dc432e70225"`
    );
    await queryRunner.query(
      `ALTER TABLE "order_products" DROP CONSTRAINT "FK_3d4ff82eba047d96f22605ceeaf"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_a58f156b92a7e63b0a6b6d5cbb4"`
    );
    await queryRunner.query(
      `ALTER TABLE "restaurants" DROP CONSTRAINT "FK_7b4694ce99045cb61b9127440dd"`
    );
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "restaurants"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
