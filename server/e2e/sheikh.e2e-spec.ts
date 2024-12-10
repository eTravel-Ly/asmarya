import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SheikhDTO } from '../src/service/dto/sheikh.dto';
import { SheikhService } from '../src/service/sheikh.service';

describe('Sheikh Controller', () => {
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
      .overrideProvider(SheikhService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all sheikhs ', async () => {
    const getEntities: SheikhDTO[] = (await request(app.getHttpServer()).get('/api/sheikhs').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET sheikhs by id', async () => {
    const getEntity: SheikhDTO = (
      await request(app.getHttpServer())
        .get('/api/sheikhs/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create sheikhs', async () => {
    const createdEntity: SheikhDTO = (await request(app.getHttpServer()).post('/api/sheikhs').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update sheikhs', async () => {
    const updatedEntity: SheikhDTO = (await request(app.getHttpServer()).put('/api/sheikhs').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update sheikhs from id', async () => {
    const updatedEntity: SheikhDTO = (
      await request(app.getHttpServer())
        .put('/api/sheikhs/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE sheikhs', async () => {
    const deletedEntity: SheikhDTO = (
      await request(app.getHttpServer())
        .delete('/api/sheikhs/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
