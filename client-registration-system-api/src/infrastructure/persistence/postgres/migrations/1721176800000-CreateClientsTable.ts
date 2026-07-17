import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1721176800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public`,
    );

    await queryRunner.query(
      `CREATE TYPE "public"."clients_favorite_color_enum" AS ENUM(
        'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "clients" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "full_name" varchar NOT NULL,
        "cpf" varchar NOT NULL,
        "email" varchar NOT NULL,
        "favorite_color" "public"."clients_favorite_color_enum" NOT NULL,
        "observations" text,
        "inserted_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_client_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_clients_cpf" UNIQUE ("cpf"),
        CONSTRAINT "UQ_clients_email" UNIQUE ("email")
      )`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_clients_cpf" ON "clients" ("cpf")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_clients_email" ON "clients" ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TYPE "public"."clients_favorite_color_enum"`);
  }
}
