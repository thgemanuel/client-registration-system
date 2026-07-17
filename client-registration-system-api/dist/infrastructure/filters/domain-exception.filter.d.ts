import { DomainException } from "../../domain/exceptions/domain.exception";
import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
export declare class DomainExceptionFilter implements ExceptionFilter<DomainException> {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: DomainException, host: ArgumentsHost): void;
}
