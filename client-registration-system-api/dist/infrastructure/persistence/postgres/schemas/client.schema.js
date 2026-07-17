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
exports.ClientTypeORM = void 0;
const typeorm_1 = require("typeorm");
const abstract_schema_1 = require("./abstract.schema");
const rainbow_color_enum_1 = require("../../../../domain/enums/rainbow-color.enum");
let ClientTypeORM = class ClientTypeORM extends abstract_schema_1.AbstractSchema {
};
exports.ClientTypeORM = ClientTypeORM;
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], ClientTypeORM.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ClientTypeORM.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ClientTypeORM.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'favorite_color',
        type: 'enum',
        enum: rainbow_color_enum_1.RainbowColorEnum,
    }),
    __metadata("design:type", String)
], ClientTypeORM.prototype, "favoriteColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], ClientTypeORM.prototype, "observations", void 0);
exports.ClientTypeORM = ClientTypeORM = __decorate([
    (0, typeorm_1.Entity)('clients')
], ClientTypeORM);
//# sourceMappingURL=client.schema.js.map