"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientsTable1721176800000 = void 0;
class CreateClientsTable1721176800000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public`);
        await queryRunner.query(`CREATE TABLE "clients" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "full_name" varchar NOT NULL,
        "cpf" varchar NOT NULL UNIQUE,
        "email" varchar NOT NULL UNIQUE,
        "preferred_color" varchar NOT NULL,
        "observations" text,
        "inserted_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        CONSTRAINT "PK_client_id" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`CREATE INDEX "IDX_clients_cpf" ON "clients" ("cpf")`);
        await queryRunner.query(`CREATE INDEX "IDX_clients_email" ON "clients" ("email")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "clients"`);
    }
}
exports.CreateClientsTable1721176800000 = CreateClientsTable1721176800000;
//# sourceMappingURL=1721176800000-CreateClientsTable.js.map