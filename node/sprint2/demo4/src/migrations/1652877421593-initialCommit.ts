import { MigrationInterface, QueryRunner } from "typeorm";
import dotenv from "dotenv";
import { hashSync } from "bcrypt";

dotenv.config();

export class initialCommit1652877421593 implements MigrationInterface {
  name = "initialCommit1652877421593";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "age" integer, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`
    );
    await queryRunner.query(
      `
        INSERT INTO "users"
            ("name", "email", "password", "isAdmin")
        VALUES
            ('${process.env.ADMIN_NAME}', '${
        process.env.ADMIN_EMAIL
      }', '${hashSync(process.env.ADMIN_PWD, 10)}', true)
        `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
