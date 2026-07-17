"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEntity = void 0;
class ClientEntity {
    id;
    fullName;
    cpf;
    email;
    preferredColor;
    observations;
    insertedAt;
    updatedAt;
    constructor(props) {
        if (props) {
            this.fullName = props.fullName;
            this.cpf = props.cpf;
            this.email = props.email;
            this.preferredColor = props.preferredColor;
            this.observations = props.observations;
        }
    }
}
exports.ClientEntity = ClientEntity;
//# sourceMappingURL=client.entity.js.map