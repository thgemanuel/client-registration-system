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
exports.ClientController = void 0;
const create_client_dto_1 = require("../../application/dto/create-client.dto");
const client_response_dto_1 = require("../../application/dto/client-response.dto");
const register_client_use_case_1 = require("../../application/use-cases/register-client.use-case");
const get_clients_use_case_1 = require("../../application/use-cases/get-clients.use-case");
const get_client_by_id_use_case_1 = require("../../application/use-cases/get-client-by-id.use-case");
const update_client_use_case_1 = require("../../application/use-cases/update-client.use-case");
const delete_client_use_case_1 = require("../../application/use-cases/delete-client.use-case");
const update_client_dto_1 = require("../../application/dto/update-client.dto");
const bad_request_dto_1 = require("../dto/bad-request.dto");
const internal_server_error_dto_1 = require("../dto/internal-server-error.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let ClientController = class ClientController {
    constructor(registerClientUseCase, getClientsUseCase, getClientByIdUseCase, updateClientUseCase, deleteClientUseCase) {
        this.registerClientUseCase = registerClientUseCase;
        this.getClientsUseCase = getClientsUseCase;
        this.getClientByIdUseCase = getClientByIdUseCase;
        this.updateClientUseCase = updateClientUseCase;
        this.deleteClientUseCase = deleteClientUseCase;
    }
    async registerClient(dto) {
        return await this.registerClientUseCase.execute(dto);
    }
    async getClients() {
        return await this.getClientsUseCase.execute();
    }
    async getClientById(id) {
        return await this.getClientByIdUseCase.execute(id);
    }
    async updateClient(id, dto) {
        return await this.updateClientUseCase.execute({ id, dto });
    }
    async deleteClient(id) {
        await this.deleteClientUseCase.execute(id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, swagger_1.ApiTags)('Client'),
    (0, swagger_1.ApiOperation)({
        summary: 'Cadastra um novo cliente',
        description: 'Realiza o cadastro de um novo cliente. O CPF deve ser único — um cliente só pode se cadastrar uma vez.',
    }),
    (0, common_1.Post)('/clients'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: client_response_dto_1.ClientResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, type: bad_request_dto_1.BadRequestDTO }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        type: internal_server_error_dto_1.InternalServerErrorDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.RegisterClientDTO]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "registerClient", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Lista todos os clientes',
        description: 'Retorna a lista de todos os clientes cadastrados.',
    }),
    (0, common_1.Get)('/clients'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [client_response_dto_1.ClientResponseDTO] }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        type: internal_server_error_dto_1.InternalServerErrorDTO,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClients", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Busca um cliente por ID',
        description: 'Retorna os dados de um cliente especfico com base no seu UUID.',
    }),
    (0, common_1.Get)('/clients/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: client_response_dto_1.ClientResponseDTO }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Cliente no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        type: internal_server_error_dto_1.InternalServerErrorDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Atualiza um cliente',
        description: 'Atualiza os dados de um cliente existente. O CPF no pode ser modificado.',
    }),
    (0, common_1.Put)('/clients/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: client_response_dto_1.ClientResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, type: bad_request_dto_1.BadRequestDTO }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Cliente no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        type: internal_server_error_dto_1.InternalServerErrorDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_dto_1.UpdateClientDTO]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateClient", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Deleta um cliente',
        description: 'Remove um cliente do sistema com base no seu UUID.',
    }),
    (0, common_1.Delete)('/clients/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Cliente removido com sucesso',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Cliente no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        type: internal_server_error_dto_1.InternalServerErrorDTO,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteClient", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [register_client_use_case_1.RegisterClientUseCase,
        get_clients_use_case_1.GetClientsUseCase,
        get_client_by_id_use_case_1.GetClientByIdUseCase,
        update_client_use_case_1.UpdateClientUseCase,
        delete_client_use_case_1.DeleteClientUseCase])
], ClientController);
//# sourceMappingURL=client.controller.js.map