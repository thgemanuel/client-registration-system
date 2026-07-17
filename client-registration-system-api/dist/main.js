"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const root_module_1 = require("./root.module");
const swagger_1 = require("@nestjs/swagger");
const domain_exception_filter_1 = require("./infrastructure/filters/domain-exception.filter");
const general_exception_filter_1 = require("./infrastructure/filters/general-exception.filter");
const custom_exception_factory_validation_pipe_1 = require("./infrastructure/pipes/custom-exception-factory-validation-pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(root_module_1.RootModule);
    const logger = new common_1.Logger('Application');
    process.on('uncaughtException', (error) => {
        logger.error(error);
    });
    app.useGlobalPipes((0, custom_exception_factory_validation_pipe_1.customExceptionFactoryValidationPipe)());
    app.useGlobalFilters(new general_exception_filter_1.GeneralExceptionFilter(logger), new domain_exception_filter_1.DomainExceptionFilter(logger));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Client Registration Service')
        .setDescription('Serviço responsável pelo cadastro de clientes')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map