"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPersistenceMapper = void 0;
const client_entity_1 = require("../../../../domain/entities/client.entity");
const client_schema_1 = require("../schemas/client.schema");
const common_1 = require("@nestjs/common");
let ClientPersistenceMapper = class ClientPersistenceMapper {
    fromEntityToSchema(client) {
        if (!client)
            return null;
        const schema = new client_schema_1.ClientTypeORM();
        schema.id = client.id;
        schema.fullName = client.fullName;
        schema.cpf = client.cpf;
        schema.email = client.email;
        schema.favoriteColor = client.favoriteColor;
        schema.observations = client.observations;
        return schema;
    }
    fromSchemaToEntity(schema) {
        if (!schema)
            return null;
        const client = new client_entity_1.Client();
        client.id = schema.id;
        client.fullName = schema.fullName;
        client.cpf = schema.cpf;
        client.email = schema.email;
        client.favoriteColor = schema.favoriteColor;
        client.observations = schema.observations;
        client.insertedAt = schema.insertedAt;
        client.updatedAt = schema.updatedAt;
        return client;
    }
};
exports.ClientPersistenceMapper = ClientPersistenceMapper;
exports.ClientPersistenceMapper = ClientPersistenceMapper = __decorate([
    (0, common_1.Injectable)()
], ClientPersistenceMapper);
//# sourceMappingURL=client.mapper.js.map