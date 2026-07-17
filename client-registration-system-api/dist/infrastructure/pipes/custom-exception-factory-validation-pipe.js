"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customExceptionFactoryValidationPipe = customExceptionFactoryValidationPipe;
const domain_exception_1 = require("../../domain/exceptions/domain.exception");
const common_1 = require("@nestjs/common");
function customExceptionFactoryValidationPipe() {
    return new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            const errorsFormatted = errors.map((error) => {
                const errorList = [];
                (0, domain_exception_1.resolveRecursivelyMessages)(error, errorList);
                return {
                    errors: errorList.join(', '),
                    code: error.target.constructor.name,
                };
            });
            const errorResponse = {
                title: "Your request parameters didn't validate.",
                errors: errorsFormatted.map((error) => ({
                    code: error.code,
                    title: 'HTTP request validation error',
                    reason: error.errors,
                })),
            };
            return new common_1.BadRequestException(errorResponse);
        },
    });
}
//# sourceMappingURL=custom-exception-factory-validation-pipe.js.map