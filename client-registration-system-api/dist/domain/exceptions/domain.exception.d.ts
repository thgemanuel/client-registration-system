import { ValidationError } from 'class-validator';
export declare class DomainException extends Error {
    private errors;
    constructor(errors: string[]);
    getErrors(): string[];
}
export declare function resolveRecursivelyMessages(error: ValidationError, errorList: string[]): void;
