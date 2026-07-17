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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterClientDTO = void 0;
const class_validator_1 = require("class-validator");
const rainbow_color_enum_1 = require("../../domain/enums/rainbow-color.enum");
class RegisterClientDTO {
}
exports.RegisterClientDTO = RegisterClientDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo fullName (nome completo) é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O campo fullName deve ser uma string válida.' }),
    __metadata("design:type", String)
], RegisterClientDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo cpf é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O campo cpf deve ser uma string.' }),
    (0, class_validator_1.Matches)(/^\d{11}$/, {
        message: 'O campo cpf deve conter exatamente 11 dígitos numéricos.',
    }),
    __metadata("design:type", String)
], RegisterClientDTO.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo email é obrigatório.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'O campo email deve ser um e-mail válido.' }),
    __metadata("design:type", String)
], RegisterClientDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'O campo favoriteColor (cor preferida) é obrigatório.',
    }),
    (0, class_validator_1.IsEnum)(rainbow_color_enum_1.RainbowColorEnum, {
        message: `O campo favoriteColor deve ser uma das seguintes cores: ${Object.values(rainbow_color_enum_1.RainbowColorEnum).join(', ')}.`,
    }),
    __metadata("design:type", String)
], RegisterClientDTO.prototype, "favoriteColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O campo observations deve ser uma string.' }),
    __metadata("design:type", String)
], RegisterClientDTO.prototype, "observations", void 0);
//# sourceMappingURL=create-client.dto.js.map