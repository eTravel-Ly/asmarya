import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { PaymentMethodDTO } from '../src/service/dto/payment-method.dto';
import { PaymentMethodService } from '../src/service/payment-method.service';

describe('PaymentMethod Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(PaymentMethodService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all payment-methods ', async () => {
    const getEntities: PaymentMethodDTO[] = (await request(app.getHttpServer()).get('/api/payment-methods').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET payment-methods by id', async () => {
    const getEntity: PaymentMethodDTO = (
      await request(app.getHttpServer())
        .get('/api/payment-methods/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create payment-methods', async () => {
    const createdEntity: PaymentMethodDTO = (await request(app.getHttpServer()).post('/api/payment-methods').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update payment-methods', async () => {
    const updatedEntity: PaymentMethodDTO = (await request(app.getHttpServer()).put('/api/payment-methods').send(entityMock).expect(201))
      .body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update payment-methods from id', async () => {
    const updatedEntity: PaymentMethodDTO = (
      await request(app.getHttpServer())
        .put('/api/payment-methods/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE payment-methods', async () => {
    const deletedEntity: PaymentMethodDTO = (
      await request(app.getHttpServer())
        .delete('/api/payment-methods/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
