"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAlreadyExistsException = void 0;
const domain_exception_1 = require("./domain.exception");
class ClientAlreadyExistsException extends domain_exception_1.DomainException {
    constructor() {
        super(['Este CPF já está cadastrado']);
        this.name = ClientAlreadyExistsException.name;
    }
}
exports.ClientAlreadyExistsException = ClientAlreadyExistsException;
//# sourceMappingURL=client-already-exists.exception.js.map