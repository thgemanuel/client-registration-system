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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_client_dto_1 = require("../../application/dto/create-client.dto");
const create_client_response_dto_1 = require("../../application/dto/create-client-response.dto");
const create_client_use_case_1 = require("../../application/use-cases/create-client.use-case");
let ClientController = class ClientController {
    createClientUseCase;
    constructor(createClientUseCase) {
        this.createClientUseCase = createClientUseCase;
    }
    async createClient(dto) {
        return await this.createClientUseCase.execute(dto);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, swagger_1.ApiTags)('Client'),
    (0, swagger_1.ApiOperation)({
        summary: 'Register a new client',
        description: 'Creates a new client registration with provided data',
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        type: create_client_response_dto_1.CreateClientResponseDTO,
        description: 'Client registered successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_dto_1.CreateClientDTO]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [create_client_use_case_1.CreateClientUseCase])
], ClientController);
//# sourceMappingURL=client.controller.js.map