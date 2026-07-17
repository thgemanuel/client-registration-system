"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientTypeOrmMapper = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("../../../../domain/entities/client.entity");
const client_schema_1 = require("../schemas/client.schema");
let ClientTypeOrmMapper = class ClientTypeOrmMapper {
    fromEntityToSchema(entity) {
        if (!entity)
            return null;
        const schema = new client_schema_1.ClientTypeORM();
        schema.id = entity.id;
        schema.full_name = entity.fullName;
        schema.cpf = entity.cpf;
        schema.email = entity.email;
        schema.preferred_color = entity.preferredColor;
        schema.observations = entity.observations;
        schema.inserted_at = entity.insertedAt;
        schema.updated_at = entity.updatedAt;
        return schema;
    }
    fromSchemaToEntity(schema) {
        if (!schema)
            return null;
        const entity = new client_entity_1.ClientEntity();
        entity.id = schema.id;
        entity.fullName = schema.full_name;
        entity.cpf = schema.cpf;
        entity.email = schema.email;
        entity.preferredColor = schema.preferred_color;
        entity.observations = schema.observations;
        entity.insertedAt = schema.inserted_at;
        entity.updatedAt = schema.updated_at;
        return entity;
    }
};
exports.ClientTypeOrmMapper = ClientTypeOrmMapper;
exports.ClientTypeOrmMapper = ClientTypeOrmMapper = __decorate([
    (0, common_1.Injectable)()
], ClientTypeOrmMapper);
//# sourceMappingURL=client.mapper.js.map