"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundException = void 0;
class EntityNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = EntityNotFoundException.name;
    }
}
exports.EntityNotFoundException = EntityNotFoundException;
//# sourceMappingURL=entity-not-found.exception.js.map