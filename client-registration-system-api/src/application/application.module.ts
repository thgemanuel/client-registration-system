import { Module } from '@nestjs/common';
import { RegisterClientUseCase } from './use-cases/register-client.use-case';
import { ClientMapper } from './mappers/client.mapper';

@Module({
  providers: [RegisterClientUseCase, ClientMapper],
  exports: [RegisterClientUseCase, ClientMapper],
})
export class ApplicationModule {}
