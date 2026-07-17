"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainException = void 0;
exports.resolveRecursivelyMessages = resolveRecursivelyMessages;
class DomainException extends Error {
    constructor(errors) {
        super(errors.join(', '));
        this.errors = errors;
        this.name = DomainException.name;
    }
    getErrors() {
        return this.errors;
    }
}
exports.DomainException = DomainException;
function resolveRecursivelyMessages(error, errorList) {
    const hasChildren = error.children?.length > 0;
    if (!hasChildren) {
        errorList.push(`${error.target.constructor.name} has following errors: [${Object.keys(error.constraints)
            .map((key) => error.constraints[key])
            .join(', ')}]`);
        return;
    }
    error.children?.forEach((error) => resolveRecursivelyMessages(error, errorList));
}
//# sourceMappingURL=domain.exception.js.map