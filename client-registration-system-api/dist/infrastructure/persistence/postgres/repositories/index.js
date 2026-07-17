"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositories = void 0;
const client_repository_1 = require("../../../../domain/repositories/client.repository");
const client_repository_2 = require("./client.repository");
exports.repositories = [
    {
        provide: client_repository_1.CLIENT_REPOSITORY_NAME,
        useClass: client_repository_2.ClientRepositoryTypeORM,
    },
];
//# sourceMappingURL=index.js.map