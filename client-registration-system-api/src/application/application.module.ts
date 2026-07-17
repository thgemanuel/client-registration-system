import { Module } from '@nestjs/common';
import { RegisterClientUseCase } from './use-cases/register-client.use-case';
import { GetClientsUseCase } from './use-cases/get-clients.use-case';
import { GetClientByIdUseCase } from './use-cases/get-client-by-id.use-case';
import { UpdateClientUseCase } from './use-cases/update-client.use-case';
import { DeleteClientUseCase } from './use-cases/delete-client.use-case';
import { ClientMapper } from './mappers/client.mapper';
import { DomainModule } from '@domain/domain.module';

@Module({
  imports: [DomainModule],
  providers: [
    ClientMapper,
    RegisterClientUseCase,
    GetClientsUseCase,
    GetClientByIdUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
  ],
  exports: [
    ClientMapper,
    RegisterClientUseCase,
    GetClientsUseCase,
    GetClientByIdUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
  ],
})
export class ApplicationModule {}
