"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepositoryTypeORM = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_schema_1 = require("../schemas/client.schema");
const client_mapper_1 = require("../mappers/client.mapper");
let ClientRepositoryTypeORM = class ClientRepositoryTypeORM {
    typeOrmRepository;
    clientTypeOrmMapper;
    constructor(typeOrmRepository, clientTypeOrmMapper) {
        this.typeOrmRepository = typeOrmRepository;
        this.clientTypeOrmMapper = clientTypeOrmMapper;
    }
    async create(client) {
        let clientSchema = this.clientTypeOrmMapper.fromEntityToSchema(client);
        clientSchema = await this.typeOrmRepository.save(clientSchema, {
            reload: true,
        });
        return this.clientTypeOrmMapper.fromSchemaToEntity(clientSchema);
    }
    async findById(id) {
        const clientSchema = await this.typeOrmRepository.findOne({
            where: { id },
        });
        if (!clientSchema)
            return null;
        return this.clientTypeOrmMapper.fromSchemaToEntity(clientSchema);
    }
    async findByCpf(cpf) {
        const clientSchema = await this.typeOrmRepository.findOne({
            where: { cpf },
        });
        if (!clientSchema)
            return null;
        return this.clientTypeOrmMapper.fromSchemaToEntity(clientSchema);
    }
    async findByEmail(email) {
        const clientSchema = await this.typeOrmRepository.findOne({
            where: { email },
        });
        if (!clientSchema)
            return null;
        return this.clientTypeOrmMapper.fromSchemaToEntity(clientSchema);
    }
    async findAll() {
        const clientSchemas = await this.typeOrmRepository.find();
        return clientSchemas.map((schema) => this.clientTypeOrmMapper.fromSchemaToEntity(schema));
    }
    async update(client) {
        let clientSchema = this.clientTypeOrmMapper.fromEntityToSchema(client);
        clientSchema = await this.typeOrmRepository.save(clientSchema, {
            reload: true,
        });
        return this.clientTypeOrmMapper.fromSchemaToEntity(clientSchema);
    }
    async delete(id) {
        await this.typeOrmRepository.delete(id);
    }
};
exports.ClientRepositoryTypeORM = ClientRepositoryTypeORM;
exports.ClientRepositoryTypeORM = ClientRepositoryTypeORM = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_schema_1.ClientTypeORM)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        client_mapper_1.ClientTypeOrmMapper])
], ClientRepositoryTypeORM);
//# sourceMappingURL=client.repository.js.map