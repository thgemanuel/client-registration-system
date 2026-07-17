import { RegisterClientDTO } from '@application/dto/create-client.dto';
import { RegisterClientResponseDTO } from '@application/dto/create-client-response.dto';
import { RegisterClientUseCase } from '@application/use-cases/register-client.use-case';
import { BadRequestDTO } from '@infrastructure/dto/bad-request.dto';
import { InternalServerErrorDTO } from '@infrastructure/dto/internal-server-error.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class ClientController {
  constructor(
    private readonly registerClientUseCase: RegisterClientUseCase,
  ) {}

  @ApiTags('Client')
  @ApiOperation({
    summary: 'Cadastra um novo cliente',
    description:
      'Realiza o cadastro de um novo cliente. O CPF deve ser único — um cliente só pode se cadastrar uma vez.',
  })
  @Post('/clients')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: RegisterClientResponseDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: BadRequestDTO })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorDTO,
  })
  async registerClient(
    @Body() dto: RegisterClientDTO,
  ): Promise<RegisterClientResponseDTO> {
    return await this.registerClientUseCase.execute(dto);
  }
}
