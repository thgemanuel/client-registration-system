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
exports.RegisterClientUseCase = void 0;
const common_1 = require("@nestjs/common");
const client_repository_1 = require("../../domain/repositories/client.repository");
const client_mapper_1 = require("../mappers/client.mapper");
const client_already_exists_exception_1 = require("../../domain/exceptions/client-already-exists.exception");
const client_email_already_exists_exception_1 = require("../../domain/exceptions/client-email-already-exists.exception");
let RegisterClientUseCase = class RegisterClientUseCase {
    constructor(clientRepository, clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }
    async execute(dto) {
        const existingClient = await this.clientRepository.findByCpf(dto.cpf);
        if (existingClient) {
            throw new client_already_exists_exception_1.ClientAlreadyExistsException();
        }
        const emailExists = await this.clientRepository.findByEmail(dto.email);
        if (emailExists) {
            throw new client_email_already_exists_exception_1.ClientEmailAlreadyExistsException();
        }
        const client = this.clientMapper.parseToEntity(dto);
        const createdClient = await this.clientRepository.create(client);
        return this.clientMapper.parseToDTO(createdClient);
    }
};
exports.RegisterClientUseCase = RegisterClientUseCase;
exports.RegisterClientUseCase = RegisterClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(client_repository_1.CLIENT_REPOSITORY_NAME)),
    __metadata("design:paramtypes", [Object, client_mapper_1.ClientMapper])
], RegisterClientUseCase);
//# sourceMappingURL=register-client.use-case.js.map