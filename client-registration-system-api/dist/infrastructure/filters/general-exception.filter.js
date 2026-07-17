"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let GeneralExceptionFilter = class GeneralExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const isHttpException = exception instanceof common_1.HttpException;
        if (isHttpException) {
            const status = exception.getStatus();
            const responseBody = exception.getResponse();
            this.logger.warn('HTTP exception caught', {
                error: exception,
                status,
                response: responseBody,
                path: request.url,
                method: request.method,
            });
            response.status(status).json(responseBody);
            return;
        }
        const returnStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this.logger.error('Unexpected error caught', {
            error: exception,
            path: request.url,
            method: request.method,
        });
        const errorResponse = {
            statusCode: returnStatus,
            message: exception.message || null,
            error: exception.name || null,
            timestamp: new Date().toISOString(),
            path: request.url,
        };
        response.status(returnStatus).json(errorResponse);
    }
};
exports.GeneralExceptionFilter = GeneralExceptionFilter;
exports.GeneralExceptionFilter = GeneralExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [common_1.Logger])
], GeneralExceptionFilter);
//# sourceMappingURL=general-exception.filter.js.map