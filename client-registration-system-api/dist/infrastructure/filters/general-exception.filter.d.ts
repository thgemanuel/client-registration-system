import { ArgumentsHost, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
export declare class GeneralExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: Error | HttpException, host: ArgumentsHost): void;
}
