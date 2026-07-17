import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { ClientResponseDTO } from '@application/dto/client-response.dto';
import { RegisterClientUseCase } from '@application/use-cases/register-client.use-case';
import { GetClientsUseCase } from '@application/use-cases/get-clients.use-case';
import { GetClientByIdUseCase } from '@application/use-cases/get-client-by-id.use-case';
import { UpdateClientUseCase } from '@application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '@application/use-cases/delete-client.use-case';
import { UpdateClientDTO } from '@application/dto/update-client.dto';
import { BadRequestDTO } from '@infrastructure/dto/bad-request.dto';
import { InternalServerErrorDTO } from '@infrastructure/dto/internal-server-error.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class ClientController {
  constructor(
    private readonly registerClientUseCase: RegisterClientUseCase,
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly getClientByIdUseCase: GetClientByIdUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @ApiTags('Client')
  @ApiOperation({
    summary: 'Cadastra um novo cliente',
    description:
      'Realiza o cadastro de um novo cliente. O CPF deve ser único — um cliente só pode se cadastrar uma vez.',
  })
  @Post('/clients')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: ClientResponseDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorDTO,
  })
  async registerClient(
    @Body() dto: RegisterClientDTO,
  ): Promise<ClientResponseDTO> {
    return await this.registerClientUseCase.execute(dto);
  }

  @ApiOperation({
    summary: 'Lista todos os clientes',
    description: 'Retorna a lista de todos os clientes cadastrados.',
  })
  @Get('/clients')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [ClientResponseDTO] })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorDTO,
  })
  async getClients(): Promise<ClientResponseDTO[]> {
    return await this.getClientsUseCase.execute();
  }

  @ApiOperation({
    summary: 'Busca um cliente por ID',
    description:
      'Retorna os dados de um cliente especfico com base no seu UUID.',
  })
  @Get('/clients/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ClientResponseDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorDTO,
  })
  async getClientById(@Param('id') id: string): Promise<ClientResponseDTO> {
    return await this.getClientByIdUseCase.execute(id);
  }

  @ApiOperation({
    summary: 'Atualiza um cliente',
    description:
      'Atualiza os dados de um cliente existente. O CPF no pode ser modificado.',
  })
  @Put('/clients/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ClientResponseDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestDTO })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorDTO,
  })
  async updateClient(
    @Param('id') id: string,
    @Body() dto: UpdateClientDTO,
  ): Promise<ClientResponseDTO> {
    return await this.updateClientUseCase.execute({ id, dto });
  }

  @ApiOperation({
    summary: 'Deleta um cliente',
    description: 'Remove um cliente do sistema com base no seu UUID.',
  })
  @Delete('/clients/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Cliente removido com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cliente no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorDTO,
  })
  async deleteClient(@Param('id') id: string): Promise<void> {
    await this.deleteClientUseCase.execute(id);
  }
}
