"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMapper = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("../../domain/entities/client.entity");
const create_client_response_dto_1 = require("../dto/create-client-response.dto");
let ClientMapper = class ClientMapper {
    parseToEntity(createClientDTO) {
        if (!createClientDTO)
            return null;
        const client = new client_entity_1.ClientEntity({
            fullName: createClientDTO.fullName,
            cpf: createClientDTO.cpf,
            email: createClientDTO.email,
            preferredColor: createClientDTO.preferredColor,
            observations: createClientDTO.observations,
        });
        return client;
    }
    parseToDTO(client) {
        if (!client)
            return null;
        const response = new create_client_response_dto_1.CreateClientResponseDTO();
        response.id = client.id;
        response.fullName = client.fullName;
        response.cpf = client.cpf;
        response.email = client.email;
        response.preferredColor = client.preferredColor;
        response.observations = client.observations;
        response.insertedAt = client.insertedAt;
        return response;
    }
};
exports.ClientMapper = ClientMapper;
exports.ClientMapper = ClientMapper = __decorate([
    (0, common_1.Injectable)()
], ClientMapper);
//# sourceMappingURL=client.mapper.js.map