"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const client_schema_1 = require("./infrastructure/persistence/postgres/schemas/client.schema");
const client_controller_1 = require("./infrastructure/controllers/client.controller");
const client_mapper_1 = require("./infrastructure/persistence/postgres/mappers/client.mapper");
const client_repository_1 = require("./infrastructure/persistence/postgres/repositories/client.repository");
const client_mapper_2 = require("./application/mappers/client.mapper");
const create_client_use_case_1 = require("./application/use-cases/create-client.use-case");
const client_repository_interface_1 = require("./domain/repositories/client.repository.interface");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                entities: [client_schema_1.ClientTypeORM],
                synchronize: false,
                migrations: ['dist/infrastructure/persistence/postgres/migrations/**/*.js'],
                migrationsRun: false,
                logging: process.env.NODE_ENV !== 'production',
            }),
            typeorm_1.TypeOrmModule.forFeature([client_schema_1.ClientTypeORM]),
        ],
        controllers: [app_controller_1.AppController, client_controller_1.ClientController],
        providers: [
            app_service_1.AppService,
            client_mapper_1.ClientTypeOrmMapper,
            {
                provide: client_repository_interface_1.CLIENTREPOSITORY_NAME,
                useClass: client_repository_1.ClientRepositoryTypeORM,
            },
            client_mapper_2.ClientMapper,
            create_client_use_case_1.CreateClientUseCase,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map