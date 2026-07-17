export declare class ClientEntity {
    id: string;
    fullName: string;
    cpf: string;
    email: string;
    preferredColor: string;
    observations?: string;
    insertedAt: Date;
    updatedAt?: Date;
    constructor(props?: {
        fullName: string;
        cpf: string;
        email: string;
        preferredColor: string;
        observations?: string;
    });
}
