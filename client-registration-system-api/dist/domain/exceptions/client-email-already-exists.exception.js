"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEmailAlreadyExistsException = void 0;
const domain_exception_1 = require("./domain.exception");
class ClientEmailAlreadyExistsException extends domain_exception_1.DomainException {
    constructor() {
        super(['Este E-mail já está cadastrado']);
        this.name = ClientEmailAlreadyExistsException.name;
    }
}
exports.ClientEmailAlreadyExistsException = ClientEmailAlreadyExistsException;
//# sourceMappingURL=client-email-already-exists.exception.js.map