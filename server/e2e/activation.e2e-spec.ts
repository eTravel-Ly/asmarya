import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ActivationDTO } from '../src/service/dto/activation.dto';
import { ActivationService } from '../src/service/activation.service';

describe('Activation Controller', () => {
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
      .overrideProvider(ActivationService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all activations ', async () => {
    const getEntities: ActivationDTO[] = (await request(app.getHttpServer()).get('/api/activations').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET activations by id', async () => {
    const getEntity: ActivationDTO = (
      await request(app.getHttpServer())
        .get('/api/activations/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create activations', async () => {
    const createdEntity: ActivationDTO = (await request(app.getHttpServer()).post('/api/activations').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update activations', async () => {
    const updatedEntity: ActivationDTO = (await request(app.getHttpServer()).put('/api/activations').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update activations from id', async () => {
    const updatedEntity: ActivationDTO = (
      await request(app.getHttpServer())
        .put('/api/activations/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE activations', async () => {
    const deletedEntity: ActivationDTO = (
      await request(app.getHttpServer())
        .delete('/api/activations/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});