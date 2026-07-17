"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const application_module_1 = require("../application/application.module");
const client_controller_1 = require("./controllers/client.controller");
const repositories_1 = require("./persistence/postgres/repositories");
const schemas_1 = require("./persistence/postgres/schemas");
const mappers_1 = require("./persistence/postgres/mappers");
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                synchronize: false,
                autoLoadEntities: true,
            }),
            typeorm_1.TypeOrmModule.forFeature(schemas_1.schemas),
            application_module_1.ApplicationModule,
        ],
        providers: [
            common_1.Logger,
            ...repositories_1.repositories,
            ...mappers_1.mappers,
        ],
        exports: [
            ...repositories_1.repositories.map((repo) => repo.provide),
            common_1.Logger,
        ],
        controllers: [client_controller_1.ClientController],
    })
], InfrastructureModule);
//# sourceMappingURL=infrastructure.module.js.map