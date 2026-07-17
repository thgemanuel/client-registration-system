"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_client_dto_1 = require("./create-client.dto");
class UpdateClientDTO extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_client_dto_1.RegisterClientDTO, ['cpf'])) {
}
exports.UpdateClientDTO = UpdateClientDTO;
//# sourceMappingURL=update-client.dto.js.map