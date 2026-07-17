"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const register_client_use_case_1 = require("./use-cases/register-client.use-case");
const get_clients_use_case_1 = require("./use-cases/get-clients.use-case");
const get_client_by_id_use_case_1 = require("./use-cases/get-client-by-id.use-case");
const update_client_use_case_1 = require("./use-cases/update-client.use-case");
const delete_client_use_case_1 = require("./use-cases/delete-client.use-case");
const client_mapper_1 = require("./mappers/client.mapper");
const domain_module_1 = require("../domain/domain.module");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [domain_module_1.DomainModule],
        providers: [
            client_mapper_1.ClientMapper,
            register_client_use_case_1.RegisterClientUseCase,
            get_clients_use_case_1.GetClientsUseCase,
            get_client_by_id_use_case_1.GetClientByIdUseCase,
            update_client_use_case_1.UpdateClientUseCase,
            delete_client_use_case_1.DeleteClientUseCase,
        ],
        exports: [
            client_mapper_1.ClientMapper,
            register_client_use_case_1.RegisterClientUseCase,
            get_clients_use_case_1.GetClientsUseCase,
            get_client_by_id_use_case_1.GetClientByIdUseCase,
            update_client_use_case_1.UpdateClientUseCase,
            delete_client_use_case_1.DeleteClientUseCase,
        ],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map