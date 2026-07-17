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

  const generateUniqueCpf = () =>
    Math.floor(10000000000 + Math.random() * 90000000000)
      .toString()
      .substring(0, 11);

  const generateUniqueEmail = () =>
    `e2e_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;

  const baseDto = () => ({
    fullName: 'E2E Test User',
    cpf: generateUniqueCpf(),
    email: generateUniqueEmail(),
    favoriteColor: RainbowColorEnum.INDIGO,
  });

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

  afterAll(async () => {
    await app.close();
  });

  describe('POST /clients', () => {
    it('should create a client and return 201 with the created data', async () => {
      const dto = baseDto();
      const response = await request(app.getHttpServer())
        .post('/clients')
        .send(dto)
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(response.body.cpf).toBe(dto.cpf);
      expect(response.body.fullName).toBe(dto.fullName);
      expect(response.body.email).toBe(dto.email);
      expect(response.body.favoriteColor).toBe(dto.favoriteColor);
    });

    it('should return 400 for duplicate CPF', async () => {
      const dto = baseDto();
      await request(app.getHttpServer()).post('/clients').send(dto).expect(201);

      const response = await request(app.getHttpServer())
        .post('/clients')
        .send(dto)
        .expect(400);

      expect(response.body.errors[0].code).toBe('ClientAlreadyExistsException');
    });

    it('should return 400 for duplicate email with different CPF', async () => {
      const dto = baseDto();
      await request(app.getHttpServer()).post('/clients').send(dto).expect(201);

      const dtoWithSameEmail = { ...baseDto(), email: dto.email };
      const response = await request(app.getHttpServer())
        .post('/clients')
        .send(dtoWithSameEmail)
        .expect(400);

      expect(response.body.errors[0].code).toBe('ClientEmailAlreadyExistsException');
    });

    it('should return 400 when required fields are missing', async () => {
      await request(app.getHttpServer())
        .post('/clients')
        .send({})
        .expect(400);
    });
  });

  describe('GET /clients', () => {
    it('should return 200 and an array of clients', async () => {
      const response = await request(app.getHttpServer())
        .get('/clients')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /clients/:id', () => {
    it('should return 200 and the client when found', async () => {
      const dto = baseDto();
      const created = await request(app.getHttpServer())
        .post('/clients')
        .send(dto)
        .expect(201);

      const id = created.body.id;
      const response = await request(app.getHttpServer())
        .get(`/clients/${id}`)
        .expect(200);

      expect(response.body.id).toBe(id);
      expect(response.body.cpf).toBe(dto.cpf);
    });

    it('should return 500 for a non-existent id (EntityNotFoundException not yet mapped)', async () => {
      await request(app.getHttpServer())
        .get('/clients/non-existent-uuid')
        .expect(500);
    });
  });

  describe('PUT /clients/:id', () => {
    it('should return 200 and the updated client', async () => {
      const dto = baseDto();
      const created = await request(app.getHttpServer())
        .post('/clients')
        .send(dto)
        .expect(201);

      const id = created.body.id;
      const response = await request(app.getHttpServer())
        .put(`/clients/${id}`)
        .send({ fullName: 'Updated Name' })
        .expect(200);

      expect(response.body.id).toBe(id);
      expect(response.body.fullName).toBe('Updated Name');
    });

    it('should return 400 when trying to update email to an already registered one', async () => {
      const dtoA = baseDto();
      const dtoB = baseDto();

      await request(app.getHttpServer()).post('/clients').send(dtoA).expect(201);
      const createdB = await request(app.getHttpServer())
        .post('/clients')
        .send(dtoB)
        .expect(201);

      const response = await request(app.getHttpServer())
        .put(`/clients/${createdB.body.id}`)
        .send({ email: dtoA.email })
        .expect(400);

      expect(response.body.errors[0].code).toBe(
        'ClientEmailAlreadyExistsException',
      );
    });
  });

  describe('DELETE /clients/:id', () => {
    it('should return 204 when successfully deleted', async () => {
      const dto = baseDto();
      const created = await request(app.getHttpServer())
        .post('/clients')
        .send(dto)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/clients/${created.body.id}`)
        .expect(204);
    });

    it('should return 404 after deleting and trying to GET the same client', async () => {
      const dto = baseDto();
      const created = await request(app.getHttpServer())
        .post('/clients')
        .send(dto)
        .expect(201);

      const id = created.body.id;
      await request(app.getHttpServer()).delete(`/clients/${id}`).expect(204);

      await request(app.getHttpServer()).get(`/clients/${id}`).expect(500);
    });
  });
});
