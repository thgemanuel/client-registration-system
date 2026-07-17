import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { RootModule } from './../src/root.module';
import { customExceptionFactoryValidationPipe } from '@infrastructure/pipes/custom-exception-factory-validation-pipe';
import { GeneralExceptionFilter } from '@infrastructure/filters/general-exception.filter';
import { DomainExceptionFilter } from '@infrastructure/filters/domain-exception.filter';
import { Logger } from '@nestjs/common';
import { RainbowColorEnum } from '@domain/enums/rainbow-color.enum';

describe('ClientController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const logger = new Logger('Test');
    app.useGlobalPipes(customExceptionFactoryValidationPipe());
    app.useGlobalFilters(
      new GeneralExceptionFilter(logger),
      new DomainExceptionFilter(logger),
    );

    await app.init();
  });

  it('/clients (POST) - should create a client', async () => {
    const uniqueCpf = Math.floor(10000000000 + Math.random() * 90000000000)
      .toString()
      .substring(0, 11);

    const dto = {
      fullName: 'E2E Test User',
      cpf: uniqueCpf,
      email: 'e2e@example.com',
      favoriteColor: RainbowColorEnum.INDIGO,
    };

    const response = await request(app.getHttpServer())
      .post('/clients')
      .send(dto)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.cpf).toBe(uniqueCpf);
    expect(response.body.fullName).toBe('E2E Test User');
  });

  it('/clients (POST) - should return 400 for duplicate CPF', async () => {
    const uniqueCpf = Math.floor(10000000000 + Math.random() * 90000000000)
      .toString()
      .substring(0, 11);

    const dto = {
      fullName: 'E2E Duplicate Test User',
      cpf: uniqueCpf,
      email: 'duplicate@example.com',
      favoriteColor: RainbowColorEnum.INDIGO,
    };

    // First request should succeed
    await request(app.getHttpServer()).post('/clients').send(dto).expect(201);

    // Second request with same CPF should fail with domain exception mapped to 400
    const response = await request(app.getHttpServer())
      .post('/clients')
      .send(dto)
      .expect(400);

    expect(response.body.errors[0].code).toBe('ClientAlreadyExistsException');
  });

  afterAll(async () => {
    await app.close();
  });
});
